import 'dart:convert';

import 'package:flutter/foundation.dart';
import 'package:flutter_barcode_scanner/flutter_barcode_scanner.dart';
import 'package:path/path.dart' as Path;
import 'dart:io';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_storage/firebase_storage.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:gigboat/addstore.dart';
import 'package:gigboat/utilities.dart';
import 'package:image_picker/image_picker.dart';
import 'package:speech_to_text/speech_recognition_result.dart';
import 'package:speech_to_text/speech_to_text.dart';
import 'constants.dart';
import 'data.dart';
import 'objects.dart';
import 'package:http/http.dart' as http;

class AddItems extends StatefulWidget {
  const AddItems({Key? key,required this.store, required this.isEdit, required this.item}) : super(key: key);
  final Store store;
  final Item item;
  final bool isEdit;
  @override
  State<AddItems> createState() => _AddItemsState();
}

class _AddItemsState extends State<AddItems> {
  final databaseReference = FirebaseFirestore.instance;
  FocusNode nameFocusNode = FocusNode();
  FocusNode idFocusNode = FocusNode();
  FocusNode priceFocusNode = FocusNode();
  FocusNode quantityFocusNode = FocusNode();
  FocusNode descFocusNode = FocusNode();
  final nameController = TextEditingController();
  final descController = TextEditingController();
  final priceController = TextEditingController();
  final idController = TextEditingController();
  final quantityController = TextEditingController();
  bool _isEdit = false;
  bool _clearFile = false;
  String _regImage = '';
  bool _showPhase2= false,_showPhase3 = false,_showPhase4 = false,_showPhase5 = false,_showPhase6 = false,_showPhase7 = false,_showPhase8 = false;
  String mode = '';
  var locales;

  _phase1(){
    return SingleChildScrollView(
        child:Container(
            padding: EdgeInsets.only(left:10,right:10,top:100),
            child: Column(
                children: <Widget>[
                  file !=null?
                  Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      ClipRRect(
                        borderRadius: BorderRadius.circular(100), // Image border
                        child: SizedBox.fromSize(
                          size: Size.fromRadius(100), // Image radius
                          child: Image.file(file,width: 100,fit: BoxFit.cover,),
                        ),
                      ),
                      SizedBox(width: 10,),
                      FlatButton(
                          child: Text('RESET',style:TextStyle(color:buttonColor,fontSize:16,fontWeight: FontWeight.normal)),
                          onPressed:(){
                            _reset();
                          }
                      ),
                    ],
                  ):_regImage==''?_uploadImage():
                  InkWell(
                    onTap: (){
                      _showMessagePopUp(context);
                    },
                    child: ClipRRect(
                      borderRadius:BorderRadius.circular(20),
                      child: Image.network(
                        _regImage,
                        fit: BoxFit.cover,
                        cacheWidth: 200, cacheHeight: 200,
                        loadingBuilder:(BuildContext context, Widget child,ImageChunkEvent? loadingProgress) {
                          if (loadingProgress == null) return child;
                          return Center(
                            child: CircularProgressIndicator(backgroundColor: buttonColor,),
                          );
                        },
                      ),
                    ),
                  ),
                  Divider(),
                  Container(
                    padding: EdgeInsets.all(10),
                    child: Row(
                      children: <Widget>[
                        InkWell(
                          onTap:(){

                            Navigator.pop(context);
                          },
                          child:Container(
                              padding: EdgeInsets.only(left:10),
                              height:MediaQuery.of(context).size.width * .1,
                              child: Center(
                                child:new Text("BACK",style: TextStyle(color:buttonColor,fontSize:fontNormalSize,fontWeight: FontWeight.normal)),
                              )
                          ),
                        ),
                        Spacer(),
                        RaisedButton.icon(
                          icon: Icon(Icons.arrow_forward,color:buttonLabelColor,size: iconBigSize,),
                          label: Text('NEXT',style: TextStyle(fontSize: fontSize,color:buttonLabelColor)),
                          onPressed: (){
                            _stopListening();
                            if (this.mounted) setState(() {
                              _showPhase2 = true;
                            });
                          },
                          color: buttonColor,
                        ),
                      ],
                    ),
                  )
                ]
            )));
  }

  SpeechToText _speechToText = SpeechToText();
  String _lastWords = '';
  TextEditingController editingController  = new TextEditingController();

  void _initSpeech() async {
    print('Speech enabled..');
    // _speechEnabled = await _speechToText.initialize();
    _speechToText.initialize().then((value){
      if(value) {
        _startListening();
      } else {
        _stopListening();
      }
    });
    print('Speech enabled..');
    setState(() {});
  }

  void _startListening() async {
    print('Started listening..');
    await _speechToText.listen(onResult: _onSpeechResult,listenFor: Duration(seconds: 5));
    if(_speechToText.isListening) {

    } else
      print('Praveen');
  }

  /// Manually stop the active speech recognition session
  /// Note that there are also timeouts that each platform enforces
  /// and the SpeechToText plugin supports setting timeouts on the
  /// listen method.
  void _stopListening() async {
    print('Stopped listening..');
    await _speechToText.stop();
    print('_lastWords = '+_lastWords);

    // setState(() {
    //   currentPage=HomeView(person: _person,fromMain: true,query: _lastWords,);
    // });
  }

  /// This is the callback that the SpeechToText plugin calls when
  /// the platform returns recognized words.
  void _onSpeechResult(SpeechRecognitionResult result) {
    setState(() {
      _lastWords = result.recognizedWords;
      if(mode == 'name') {
        nameController.text = _lastWords;
      } else if(mode =='desc') {
        descController.text = _lastWords;
      } else if(mode =='price') {
        priceController.text = _lastWords;
      } else if(mode =='quantity') {
        quantityController.text = _lastWords;
      } else if(mode =='id') {
        idController.text = _lastWords;
      }
      print('words listening..'+_lastWords);
      print(result.finalResult);
    });
    if(result.finalResult) {
      _stopListening();
    }
  }

  _phase2(){
    setState(() {
      mode = 'name';
    });
    _initSpeech();
    return SingleChildScrollView(
        child:Container(
            padding: EdgeInsets.only(left:10,right:10,top:100),
            child: Column(
                children: <Widget>[
                  Text('Start speaking to record',style: new TextStyle(fontSize: 16),),
                  SizedBox(height:10),
                  TextFormField(
                    focusNode: nameFocusNode,
                    autofocus: true,
                    onFieldSubmitted: (term){
                      nameFocusNode.unfocus();
                      FocusScope.of(context).requestFocus(idFocusNode);
                    },
                    controller: nameController,
                    maxLines: null,
                    style: const TextStyle(fontSize:14,fontWeight: FontWeight.normal),
                    textInputAction: TextInputAction.next,
                    autocorrect: false,
                    textCapitalization: TextCapitalization.sentences,
                    decoration: InputDecoration(
                      focusedBorder:const OutlineInputBorder(
                        borderSide: BorderSide(color: Colors.grey, width: 1.0),
                      ),
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(25.0),
                        borderSide: const BorderSide(),
                      ),
                      hintText: 'Name', hintStyle: const TextStyle(color:Colors.grey,fontSize:14,fontWeight: FontWeight.normal),
                    ),
                  ),
                  Divider(),
                  Container(
                    padding: EdgeInsets.all(10),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: <Widget>[
                        InkWell(
                          onTap:(){_stopListening();
                            if(this.mounted)setState(() {
                              _showPhase2 = false;
                            });
                          },
                          child:Container(
                              padding: EdgeInsets.only(left:10),
                              height:MediaQuery.of(context).size.width * .1,
                              child: Center(
                                child:new Text("BACK",style: TextStyle(color:buttonColor,fontSize:fontNormalSize,fontWeight: FontWeight.normal)),
                              )
                          ),
                        ),
                        IconButton(
                          onPressed: (){
                            setState(() {
                              mode = 'name';
                            });
                            _startListening();
                          },
                          icon: Icon(Icons.mic,color: buttonColor,size:40),
                        ),
                        RaisedButton.icon(
                          icon: Icon(Icons.arrow_forward,color:buttonLabelColor,size: iconBigSize,),
                          label: Text('NEXT',style: TextStyle(fontSize: fontSize,color:buttonLabelColor)),
                          onPressed: (){
                            _stopListening();
                            if (this.mounted) setState(() {
                              _showPhase3 = true;
                            });
                          },
                          color: buttonColor,
                        ),
                      ],
                    ),
                  )
                ]
            )));
  }

  _phase3(){
    setState(() {
      mode = 'id';
    });
    _initSpeech();
    return SingleChildScrollView(
        child:Container(
            padding: EdgeInsets.only(left:10,right:10,top:100),
            child: Column(
                children: <Widget>[
                  TextFormField(
                    focusNode: idFocusNode,
                    onFieldSubmitted: (term){
                      idFocusNode.unfocus();
                      FocusScope.of(context).requestFocus(descFocusNode);
                    },
                    controller: idController,
                    autocorrect: false,
                    maxLines: null,
                    autofocus: true,
                    style: const TextStyle(fontSize:14,fontWeight: FontWeight.normal),
                    textInputAction: TextInputAction.next,
                    textCapitalization: TextCapitalization.sentences,
                    decoration: InputDecoration(
                      focusedBorder:const OutlineInputBorder(
                        borderSide: BorderSide(color: Colors.grey, width: 1.0),
                      ),
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(25.0),
                        borderSide: const BorderSide(),
                      ),
                      hintText: 'ID', hintStyle: const TextStyle(color:Colors.grey,fontSize:14,fontWeight: FontWeight.normal),
                    ),
                  ),
            ElevatedButton(
                  onPressed: () => scanBarcodeNormal(),
                  child: Text('Scan Barcode or QR')),
                  Divider(),
                  Container(
                    padding: EdgeInsets.all(10),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: <Widget>[
                        InkWell(
                          onTap:(){
                            _stopListening();
                            if(this.mounted)setState(() {
                              _showPhase3 = false;
                            });
                          },
                          child:Container(
                              padding: EdgeInsets.only(left:10),
                              height:MediaQuery.of(context).size.width * .1,
                              child: Center(
                                child:new Text("BACK",style: TextStyle(color:buttonColor,fontSize:fontNormalSize,fontWeight: FontWeight.normal)),
                              )
                          ),
                        ),
                        IconButton(
                          onPressed: (){
                            setState(() {
                              mode = 'id';
                            });
                            _startListening();
                          },
                          icon: Icon(Icons.mic,color: buttonColor,size:40),
                        ),
                        RaisedButton.icon(
                          icon: Icon(Icons.arrow_forward,color:buttonLabelColor,size: iconBigSize,),
                          label: Text('NEXT',style: TextStyle(fontSize: fontSize,color:buttonLabelColor)),
                          onPressed: (){
                            _stopListening();
                            if (this.mounted) setState(() {
                              _showPhase4 = true;
                            });
                          },
                          color: buttonColor,
                        ),
                      ],
                    ),
                  )
                ]
            )));
  }

  _phase4(){
    setState(() {
      mode = 'desc';
    });
    _initSpeech();
    return SingleChildScrollView(
        child:Container(
            padding: EdgeInsets.only(left:10,right:10,top:100),
            child: Column(
                children: <Widget>[
                  TextFormField(
                    focusNode: descFocusNode,
                    onFieldSubmitted: (term){
                      descFocusNode.unfocus();
                      FocusScope.of(context).requestFocus(quantityFocusNode);
                    },
                    controller: descController,
                    maxLines: null,
                    autofocus: true,
                    autocorrect: false,
                    style: const TextStyle(fontSize:14,fontWeight: FontWeight.normal),
                    textInputAction: TextInputAction.newline,
                    textCapitalization: TextCapitalization.sentences,
                    decoration: InputDecoration(
                      focusedBorder:const OutlineInputBorder(
                        borderSide: BorderSide(color: Colors.grey, width: 1.0),
                      ),
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(25.0),
                        borderSide: const BorderSide(),
                      ),
                      hintText: 'Description', hintStyle: const TextStyle(color:Colors.grey,fontSize:14,fontWeight: FontWeight.normal),
                    ),
                  ),
                  Divider(),
                  Container(
                    padding: EdgeInsets.all(10),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: <Widget>[
                        InkWell(
                          onTap:(){
                            _stopListening();
                            if(this.mounted)setState(() {
                              _showPhase4 = false;
                            });
                          },
                          child:Container(
                              padding: EdgeInsets.only(left:10),
                              height:MediaQuery.of(context).size.width * .1,
                              child: Center(
                                child:new Text("BACK",style: TextStyle(color:buttonColor,fontSize:fontNormalSize,fontWeight: FontWeight.normal)),
                              )
                          ),
                        ),
                        IconButton(
                          onPressed: (){
                            setState(() {
                              mode = 'desc';
                            });
                            _startListening();
                          },
                          icon: Icon(Icons.mic,color: buttonColor,size:40),
                        ),
                        RaisedButton.icon(
                          icon: Icon(Icons.arrow_forward,color:buttonLabelColor,size: iconBigSize,),
                          label: Text('NEXT',style: TextStyle(fontSize: fontSize,color:buttonLabelColor)),
                          onPressed: (){
                            _stopListening();
                            if (this.mounted) setState(() {
                              _showPhase5 = true;
                            });
                          },
                          color: buttonColor,
                        ),
                      ],
                    ),
                  )
                ]
            )));
  }

  _phase5(){
    setState(() {
      mode = 'quantity';
    });
    _initSpeech();
    return SingleChildScrollView(
        child:Container(
            padding: EdgeInsets.only(left:10,right:10,top:100),
            child: Column(
                children: <Widget>[
                  TextFormField(
                    focusNode: quantityFocusNode,
                    onFieldSubmitted: (term){
                      quantityFocusNode.unfocus();
                      FocusScope.of(context).requestFocus(priceFocusNode);
                    },
                    controller: quantityController,
                    autocorrect: false,
                    maxLines: null,
                    autofocus: true,
                    style: const TextStyle(fontSize:14,fontWeight: FontWeight.normal),
                    textInputAction: TextInputAction.next,
                    textCapitalization: TextCapitalization.sentences,
                    decoration: InputDecoration(
                      focusedBorder:const OutlineInputBorder(
                        borderSide: BorderSide(color: Colors.grey, width: 1.0),
                      ),
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(25.0),
                        borderSide: const BorderSide(),
                      ),
                      hintText: 'Quantity', hintStyle: const TextStyle(color:Colors.grey,fontSize:14,fontWeight: FontWeight.normal),
                    ),
                  ),
                  Divider(),
                  Container(
                    padding: EdgeInsets.all(10),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: <Widget>[
                        InkWell(
                          onTap:(){
                            _stopListening();
                            if(this.mounted)setState(() {
                              _showPhase5 = false;
                            });
                          },
                          child:Container(
                              padding: EdgeInsets.only(left:10),
                              height:MediaQuery.of(context).size.width * .1,
                              child: Center(
                                child:new Text("BACK",style: TextStyle(color:buttonColor,fontSize:fontNormalSize,fontWeight: FontWeight.normal)),
                              )
                          ),
                        ),
                        IconButton(
                          onPressed: (){
                            setState(() {
                              mode = 'quantity';
                            });
                            _startListening();
                          },
                          icon: Icon(Icons.mic,color: buttonColor,size:40),
                        ),
                        RaisedButton.icon(
                          icon: Icon(Icons.arrow_forward,color:buttonLabelColor,size: iconBigSize,),
                          label: Text('NEXT',style: TextStyle(fontSize: fontSize,color:buttonLabelColor)),
                          onPressed: (){
                            _stopListening();
                            if (this.mounted) setState(() {
                              _showPhase6 = true;
                            });
                          },
                          color: buttonColor,
                        ),
                      ],
                    ),
                  )
                ]
            )));
  }

  _phase6(){
    setState(() {
      mode = 'price';
    });
    _initSpeech();
    return SingleChildScrollView(
        child:Container(
            padding: EdgeInsets.only(left:10,right:10,top:100),
            child: Column(
                children: <Widget>[
                  TextFormField(
                    focusNode: priceFocusNode,
                    onFieldSubmitted: (term){
                      priceFocusNode.unfocus();
                    },
                    controller: priceController,
                    maxLines: null,
                    style: const TextStyle(fontSize:14,fontWeight: FontWeight.normal),
                    textInputAction: TextInputAction.next,
                    autocorrect: false,
                    inputFormatters: [
                      FilteringTextInputFormatter.allow(RegExp(r'^\d+\.?\d{0,2}')),
                    ],
                    keyboardType: TextInputType.numberWithOptions(decimal: true),
                    decoration: InputDecoration(
                      focusedBorder:const OutlineInputBorder(
                        borderSide: BorderSide(color: Colors.grey, width: 1.0),
                      ),
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(25.0),
                        borderSide: const BorderSide(),
                      ),
                      hintText: 'Price', hintStyle: const TextStyle(color:Colors.grey,fontSize:14,fontWeight: FontWeight.normal),
                    ),
                  ),
                  IconButton(
                    onPressed: (){
                      setState(() {
                        mode = 'price';
                      });
                      _startListening();
                    },
                    icon: Icon(Icons.mic,color: buttonColor,size:40),
                  ),
                  Container(
                    padding: EdgeInsets.all(10),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: <Widget>[
                        InkWell(
                          onTap:(){
                            _stopListening();
                            if(this.mounted)setState(() {
                              _showPhase6 = false;
                            });
                          },
                          child:Container(
                              padding: EdgeInsets.only(left:10),
                              height:MediaQuery.of(context).size.width * .1,
                              child: Center(
                                child:new Text("BACK",style: TextStyle(color:buttonColor,fontSize:fontNormalSize,fontWeight: FontWeight.normal)),
                              )
                          ),
                        ),
                        Spacer(),
                        RaisedButton.icon(
                          icon: Icon(Icons.arrow_forward,color:buttonLabelColor,size: iconBigSize,),
                          label: Text('SUBMIT',style: TextStyle(fontSize: fontSize,color:buttonLabelColor)),
                          onPressed: (){
                            if(file!=null) {
                              _uploadFile();
                            }
                          },
                          color: buttonColor,
                        ),
                      ],
                    ),
                  )
                ]
            )));
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor:backgroundColor,
      appBar:null,
      body:new Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: <Widget>[
            Expanded(
                child:_isEdit?_buildBody()
                    :!_showPhase2?_phase1():
                !_showPhase3?_phase2():
                !_showPhase4?_phase3():
                !_showPhase5?_phase4():
                !_showPhase6?_phase5():
                !_showPhase7?_phase6()
                :Container()
            ),
          ]),
    );
    //   Scaffold(
    //     backgroundColor: Colors.grey[100],
    //     appBar: AppBar(
    //       title: const Text('ADD ITEMS TO STORE'),
    //     ),
    //     body: _buildBody()
    // );
  }

  @override
  void initState() {
    super.initState();
    _isEdit = widget.isEdit;

    if(_isEdit) {
      nameController.text = widget.item.name;
      descController.text = widget.item.description;
      priceController.text = widget.item.price.toString();
      quantityController.text = widget.item.quantity.toString();
      idController.text = widget.item.mainId.toString();
      _regImage= widget.item.image;
    }
  }

  @override
  void dispose() {
    super.dispose();
    nameController.dispose();
    descController.dispose();
    priceController.dispose();
    idController.dispose();
    quantityController.dispose();
    descFocusNode.dispose();
    nameFocusNode.dispose();
    priceFocusNode.dispose();
    idFocusNode.dispose();
    quantityFocusNode.dispose();
  }

  var file=null;

  void _choose() async {
    ImagePicker imagePicker = ImagePicker();
    await imagePicker.getImage(
      source: ImageSource.camera,
      imageQuality: 50,
    ).then((compressedImage) {
      if(compressedImage!=null) {
        if(this.mounted)setState(() {
          file = File(compressedImage.path);
          _clearFile = false;
        });
      }
    });
  }

  void _upload() async {
    ImagePicker imagePicker = ImagePicker();
    await imagePicker.getImage(
      source: ImageSource.gallery,
      imageQuality: 50,
    ).then((compressedImage) {
      if(compressedImage!=null) {
        setState(() {
          file = File(compressedImage.path);
          _clearFile = false;
        });
      }
    });
  }

  void _reset()  {
    setState(() {
      file = null;
      _regImage = '';
    });
  }

  Widget _uploadImage() {
    return Container(
        height:100,
        child:Column(
          children: <Widget>[
            SizedBox(height: 10,),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: <Widget>[
                new OutlineButton(
                  borderSide: BorderSide(width: 1.0, color: fontColor),
                  textColor: fontColor,
                  child: new Text("CAMERA"),
                  onPressed: _choose,
                  splashColor: Colors.redAccent,
                ),
                SizedBox(width: 50,child: Text('OR ',textAlign: TextAlign.center,style:TextStyle(color:fontLabelColor,fontSize:16,fontWeight: FontWeight.normal)),),
                new OutlineButton(
                  borderSide: BorderSide(width: 1.0, color: fontColor),
                  color: buttonLabelColor,
                  textColor: buttonColor,
                  child: new Text("UPLOAD"),
                  onPressed: _upload,
                  splashColor: Colors.redAccent,
                ),
              ],
            ),
            file == null
                ? Text('No Image Selected',style:TextStyle(color:fontColor,fontSize:fontSize,fontWeight: FontWeight.normal))
                : Container(),
            SizedBox(height:10),
          ],
        )
    );
  }

  _uploadFile(){
    Reference storageReference = FirebaseStorage.instance
        .ref()
        .child('assets/' + Path.basename(file.path));
    UploadTask uploadTask = storageReference.putFile(file);
    // await uploadTask.onComplete;
    uploadTask.then((res) {
      res.ref.getDownloadURL().then((url) {
        print('Creating');
        Item item = new Item(
            mainId: _isEdit ? idController.text : '1',
            id: widget.item.id,
            name: nameController.text,
            description: descController.text,
            price: double.parse(priceController.text),
            image: url,
            quantity: quantityController.text
        );
        createItem(widget.store, item, _isEdit);
        Navigator.pop(context);
        Navigator.push(context, createRoute(AddStore(
          isEdit: true, store: widget.store,)));
      });
    });
  }

  void _showMessagePopUp(BuildContext context) {
    showDialog(
        context: context,
        builder: (BuildContext context) {
          return AlertDialog(
            title: Text('UPLOAD',
                style: TextStyle(
                    color: floatingColor,
                    fontSize: fontSize)),
            content: _uploadImage(),
            actions: <Widget>[
              FlatButton(
                child: Text('OK',
                    style: TextStyle(
                        color: buttonColor)),
                onPressed: () {
                  Navigator.of(context).pop(false);
                },
              ),
            ],
          );
        });
  }

  Future<void> scanBarcodeNormal() async {
    String barcodeScanRes;
    // Platform messages may fail, so we use a try/catch PlatformException.
    try {
      barcodeScanRes = await FlutterBarcodeScanner.scanBarcode(
          '#ff6666', 'Cancel', true, ScanMode.BARCODE);
      print(barcodeScanRes);
    } on PlatformException {
      barcodeScanRes = 'Failed to get platform version.';
    }

    // If the widget was removed from the tree while the asynchronous platform
    // message was in flight, we want to discard the reply rather than calling
    // setState to update our non-existent appearance.
    if (!mounted) return;

    setState(() {
      idController.text = barcodeScanRes;
    });
  }

  Widget _buildBody() {
    return SingleChildScrollView(
        child:Container(
          padding: const EdgeInsets.all(10),
          child:
          Column(
            children: <Widget>[
              // ElevatedButton(
              //     onPressed: () => scanBarcodeNormal(),
              //     child: Text('Start barcode scan')),
              file !=null?
              Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  ClipRRect(
                    borderRadius: BorderRadius.circular(100), // Image border
                    child: SizedBox.fromSize(
                      size: Size.fromRadius(100), // Image radius
                      child: Image.file(file,width: 100,fit: BoxFit.cover,),
                    ),
                  ),
                  SizedBox(width: 10,),
                  FlatButton(
                      child: Text('RESET',style:TextStyle(color:buttonColor,fontSize:16,fontWeight: FontWeight.normal)),
                      onPressed:(){
                        _reset();
                      }
                  ),
                ],
              ):_regImage==''?_uploadImage():
              InkWell(
                onTap: (){
                  _showMessagePopUp(context);
                },
                child: ClipRRect(
                  borderRadius:BorderRadius.circular(20),
                  child: Image.network(
                    _regImage,
                    fit: BoxFit.cover,
                    cacheWidth: 200, cacheHeight: 200,
                    loadingBuilder:(BuildContext context, Widget child,ImageChunkEvent? loadingProgress) {
                      if (loadingProgress == null) return child;
                      return Center(
                        child: CircularProgressIndicator(backgroundColor: buttonColor,),
                      );
                    },
                  ),
                ),
              ),
              const SizedBox(height:10),
              TextFormField(
                focusNode: nameFocusNode,
                onFieldSubmitted: (term){
                  nameFocusNode.unfocus();
                  FocusScope.of(context).requestFocus(idFocusNode);
                },
                controller: nameController,
                maxLines: null,
                style: const TextStyle(fontSize:14,fontWeight: FontWeight.normal),
                textInputAction: TextInputAction.next,
                textCapitalization: TextCapitalization.sentences,
                decoration: InputDecoration(
                  focusedBorder:const OutlineInputBorder(
                    borderSide: BorderSide(color: Colors.grey, width: 1.0),
                  ),
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(25.0),
                    borderSide: const BorderSide(),
                  ),
                  hintText: 'Name', hintStyle: const TextStyle(color:Colors.grey,fontSize:14,fontWeight: FontWeight.normal),
                ),
              ),
              const SizedBox(height:10),
              TextFormField(
                focusNode: idFocusNode,
                onFieldSubmitted: (term){
                  idFocusNode.unfocus();
                  FocusScope.of(context).requestFocus(descFocusNode);
                },
                controller: idController,
                maxLines: null,
                style: const TextStyle(fontSize:14,fontWeight: FontWeight.normal),
                textInputAction: TextInputAction.next,
                textCapitalization: TextCapitalization.sentences,
                decoration: InputDecoration(
                  focusedBorder:const OutlineInputBorder(
                    borderSide: BorderSide(color: Colors.grey, width: 1.0),
                  ),
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(25.0),
                    borderSide: const BorderSide(),
                  ),
                  hintText: 'ID', hintStyle: const TextStyle(color:Colors.grey,fontSize:14,fontWeight: FontWeight.normal),
                ),
              ),
              const SizedBox(height:10),
              TextFormField(
                focusNode: descFocusNode,
                onFieldSubmitted: (term){
                  descFocusNode.unfocus();
                  FocusScope.of(context).requestFocus(quantityFocusNode);
                },
                controller: descController,
                maxLines: null,
                autofocus: true,
                style: const TextStyle(fontSize:14,fontWeight: FontWeight.normal),
                textInputAction: TextInputAction.newline,
                textCapitalization: TextCapitalization.sentences,
                decoration: InputDecoration(
                  focusedBorder:const OutlineInputBorder(
                    borderSide: BorderSide(color: Colors.grey, width: 1.0),
                  ),
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(25.0),
                    borderSide: const BorderSide(),
                  ),
                  hintText: 'Description', hintStyle: const TextStyle(color:Colors.grey,fontSize:14,fontWeight: FontWeight.normal),
                ),
              ),
              const SizedBox(height:10),
              TextFormField(
                focusNode: quantityFocusNode,
                onFieldSubmitted: (term){
                  quantityFocusNode.unfocus();
                  FocusScope.of(context).requestFocus(priceFocusNode);
                },
                controller: quantityController,
                maxLines: null,
                autofocus: true,
                style: const TextStyle(fontSize:14,fontWeight: FontWeight.normal),
                textInputAction: TextInputAction.next,
                textCapitalization: TextCapitalization.sentences,
                decoration: InputDecoration(
                  focusedBorder:const OutlineInputBorder(
                    borderSide: BorderSide(color: Colors.grey, width: 1.0),
                  ),
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(25.0),
                    borderSide: const BorderSide(),
                  ),
                  hintText: 'Quantity', hintStyle: const TextStyle(color:Colors.grey,fontSize:14,fontWeight: FontWeight.normal),
                ),
              ),
              // const SizedBox(height:10),
              const SizedBox(height:10),
              TextFormField(
                focusNode: priceFocusNode,
                onFieldSubmitted: (term){
                  priceFocusNode.unfocus();
                },
                controller: priceController,
                maxLines: null,
                style: const TextStyle(fontSize:14,fontWeight: FontWeight.normal),
                textInputAction: TextInputAction.next,
                inputFormatters: [
                  FilteringTextInputFormatter.allow(RegExp(r'^\d+\.?\d{0,2}')),
                ],
                keyboardType: TextInputType.numberWithOptions(decimal: true),
                decoration: InputDecoration(
                  focusedBorder:const OutlineInputBorder(
                    borderSide: BorderSide(color: Colors.grey, width: 1.0),
                  ),
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(25.0),
                    borderSide: const BorderSide(),
                  ),
                  hintText: 'Price', hintStyle: const TextStyle(color:Colors.grey,fontSize:14,fontWeight: FontWeight.normal),
                ),
              ),

              const Divider(),
              Container(
                  padding: const EdgeInsets.all(10),
                  child: Row(
                    children: <Widget>[
                      InkWell(
                        onTap:(){
                          _stopListening();
                          Navigator.pop(context);
                        },
                        child:Container(
                            padding:const EdgeInsets.only(left: 10),
                            height:MediaQuery.of(context).size.width * .1,
                            child: const Center(
                              child:Text("BACK",style: TextStyle(color:Colors.deepOrangeAccent,fontSize:16,fontWeight: FontWeight.normal)),
                            )
                        ),
                      ),
                      const Spacer(),
                      TextButton.icon(
                        icon: const Icon(Icons.arrow_forward),
                        label: Text(_isEdit?'UPDATE':'CREATE',style: TextStyle(fontSize: 16)),
                        onPressed: (){
                          _stopListening();
                          if(file!=null) {
                            _uploadFile();
                          } else {
                            Item item = new Item(
                                mainId: _isEdit ? idController.text : '1',
                                id: widget.item.id,
                                name: nameController.text,
                                description: descController.text,
                                price: double.parse(priceController.text),
                                image: _regImage,
                                quantity: quantityController.text
                            );
                            createItem(widget.store,item, _isEdit);
                            Navigator.pop(context);
                            Navigator.push(context, createRoute(AddStore(
                              isEdit: true, store: widget.store,)));
                          }
                        },
                      ),
                    ],
                  ))
            ],
          ),
        )
    );
  }
}

class CustomCard extends StatelessWidget {
  final String _label;
  final Widget _viewPage;
  final bool featureCompleted;

  const CustomCard(this._label, this._viewPage,
      {this.featureCompleted = false});

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 5,
      margin: EdgeInsets.only(bottom: 10),
      child: ListTile(
        tileColor: Theme.of(context).primaryColor,
        title: Text(
          _label,
          style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
        ),
        onTap: () {
          if (Platform.isIOS && !featureCompleted) {
            ScaffoldMessenger.of(context).showSnackBar(SnackBar(
                content: const Text(
                    'This feature has not been implemented for iOS yet')));
          } else
            Navigator.push(
                context, MaterialPageRoute(builder: (context) => _viewPage));
        },
      ),
    );
  }
}