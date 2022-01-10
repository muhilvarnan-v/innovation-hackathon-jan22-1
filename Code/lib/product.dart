import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';
import 'package:flutter/services.dart';
import 'package:geolocator/geolocator.dart';
import 'package:translator/translator.dart';
import 'additems.dart';
import 'constants.dart';
import 'objects.dart';
import 'utilities.dart';

class NewProduct extends StatefulWidget {
  final Item product;
  final Store store;

  NewProduct({required this.product,required this.store});

  @override
  State<StatefulWidget> createState() {
    return _NewProductState();
  }
}

class _NewProductState extends State<NewProduct> {
  final db = FirebaseFirestore.instance;
  bool inCart = false;
  int count = 0;
  bool cart =true;
  List <Cart> carts = [];
  String firstHalfServiceDesc = '';
  String secondHalfServiceDesc = '';
  String firstHalfOwnerDesc = '';
  String secondHalfOwnerDesc = '';
  bool _showMoreServiceDesc = false;
  bool _showMoreUserDesc = false;
  int _max = 200;
  final List<String> imgList = [];
  int _current=0;
  late Item _product;
  final translator = GoogleTranslator();

  @override
  void initState() {
    super.initState();
    _product = widget.product;
    translate();
    _showMoreServiceDesc = _product.description.length>_max?true:false;
    if (_product.description.length > _max) {
      firstHalfServiceDesc = _product.description.substring(0, _max);
      secondHalfServiceDesc = _product.description.substring(_max, _product.description.length);
    } else {
      firstHalfServiceDesc = _product.description;
      secondHalfServiceDesc = "";
    }
    imgList.add(_product.image);
  }

  translate() async {
    translator.translate(_product.name, to: 'hi').then((value) {
      setState(() {
        _product.name = value.text;
      });
      print('Name =-=-=-=-=- ');
      print(_product.name);
    });
  }
  void _getItem(Item item) {
    Navigator.push(context, createRoute(AddItems(store:widget.store,isEdit: true,item: item,)));
  }

  @override
  Widget build(BuildContext context) {

    return InkWell(
        onTap: (){
          _getItem(_product);
        },
        splashColor: Colors.blue.withAlpha(30),
        child: Container(
//        width: 150,
            child:new Column(
              children: [
                ClipRRect(
                  borderRadius:BorderRadius.circular(20),
                  child:Container(
                    height:80,
                    child: ClipRRect(
                      borderRadius: BorderRadius.circular(100.0),
                      child: Image.network(
                        _product.image,
                        fit: BoxFit.cover,
                        cacheWidth: 100, cacheHeight: 100,
                        loadingBuilder:(BuildContext context, Widget child,ImageChunkEvent? loadingProgress) {
                          if (loadingProgress == null) return child;
                          return Center(
                            child: CircularProgressIndicator(backgroundColor: buttonColor,),
                          );
                        },
                      ),
                    ),

                  ),
                ),
                Container(
                  padding: EdgeInsets.only(left:0,top:0),
                  child:Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      Container(
                          width:120,
                          padding: EdgeInsets.only(left:0,top:5),
                          child:Text(_product.name,style: new TextStyle(fontSize: textSize,fontWeight: FontWeight.bold),maxLines: 2,textAlign: TextAlign.center,)
                      ),
                      SizedBox(height:5),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        crossAxisAlignment: CrossAxisAlignment.center,
                        children: [
//                          Icon(Icons.star,size: fontSize,color: waitColor,),
                          getCurrencySymbol(),
                          Container(
                              padding: EdgeInsets.only(left:0,top:5),
                              child:Text(_product.price.toString(),style: new TextStyle(fontSize: textSize,color: pointsColor),maxLines: 2,textAlign: TextAlign.center,)
                          ),
                        ],
                      ),
                      SizedBox(height:5),
                      Text(_product.quantity,style: new TextStyle(fontSize: textSize,color: pointsColor),maxLines: 2,textAlign: TextAlign.center,)
                    ],
                  ),
                ),
              ],
            )
        )
    );
  }
}