
import 'dart:math';

import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';
import 'package:geolocator/geolocator.dart';
import 'package:gigboat/main.dart';
import 'package:gigboat/showitems.dart';
import 'package:gigboat/utilities.dart';
import 'package:mapbox_gl/mapbox_gl.dart';
import 'additems.dart';
import 'constants.dart';
import 'data.dart';
import 'objects.dart';

class AddStore extends StatefulWidget {
  const AddStore({Key? key,required this.store,required this.isEdit}) : super(key: key);
  final Store store;
  final bool isEdit;
  @override
  State<AddStore> createState() => _AddStoreState();
}

class _AddStoreState extends State<AddStore> {
  final databaseReference = FirebaseFirestore.instance;
  FocusNode nameFocusNode = FocusNode();
  FocusNode addressFocusNode = FocusNode();
  FocusNode descFocusNode = FocusNode();
  final nameController = TextEditingController();
  final descController = TextEditingController();
  final addressController = TextEditingController();
  late MapboxMapController _mapController;
  bool _isEdit = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey[100],
      appBar: AppBar(
        title: const Text('ADD STORE DETAILS'),
      ),
      body: _buildBody()
    );
  }
  late Position position;
  LatLng _latlng = const LatLng(13.0465466, 77.5400969);

  getLocation() async {
    position = await Geolocator.getCurrentPosition(desiredAccuracy: LocationAccuracy.high);
    print(position.latitude);
    print(position.longitude);
    setState(() {
      _latlng = LatLng(position.latitude, position.longitude);
    });
  }

  @override
  void initState() {
    super.initState();
    _isEdit = widget.isEdit;
    if(_isEdit) {
      nameController.text = widget.store.name;
      descController.text = widget.store.description;
      _latlng = LatLng(widget.store.lat, widget.store.long);
    } else {
      getLocation();
    }
  }

  @override
  void dispose() {
    super.dispose();
    nameController.dispose();
    descController.dispose();
    addressController.dispose();
    descFocusNode.dispose();
    nameFocusNode.dispose();
    addressFocusNode.dispose();
  }

  Widget _buildBody() {
    return SingleChildScrollView(
        child:Container(
          padding: const EdgeInsets.all(10),
          child:
          Column(
            children: <Widget>[
              Container(
                padding: EdgeInsets.all(10),
                height:400,
                child: MapboxMap(
                  accessToken: mapBox,
                  initialCameraPosition: CameraPosition(
                    zoom: 15.0,
                    target: LatLng(_latlng.latitude,_latlng.longitude),
                  ),

                  // The onMapCreated callback should be used for everything related
                  // to updating map components via the MapboxMapController instance
                  onMapCreated: (MapboxMapController controller) async {
                    setState(() {
                      _mapController = controller;
                    });
                    // Acquire current location (returns the LatLng instance)
                    final result = await getLocation();

                    // You can either use the moveCamera or animateCamera, but the former
                    // causes a sudden movement from the initial to 'new' camera position,
                    // while animateCamera gives a smooth animated transition
                    await controller.animateCamera(
                      CameraUpdate.newLatLng(_latlng),
                    );
                    //
                    // // Add a circle denoting current user location
                    await controller.addCircle(
                      CircleOptions(
                        circleRadius: 8.0,
                        circleColor: '#006992',
                        circleOpacity: 0.8,
                        geometry: _latlng,
                        draggable: false,
                      ),
                    );
                  },
                  onMapClick: (Point<double> point, LatLng coordinates) async {
                    print(coordinates);
                    // Add a symbol (marker)
                    await _mapController.addSymbol(
                      SymbolOptions(
                        iconImage: 'embassy-15',
                        iconColor: '#006992',
                        geometry: coordinates,
                      ),
                    );
                    setState(() {
                      _latlng = coordinates;
                    });
                  },
                ),
              ),
              TextFormField(
                focusNode: nameFocusNode,
                onFieldSubmitted: (term){
                  nameFocusNode.unfocus();
                  FocusScope.of(context).requestFocus(addressFocusNode);
                },
                controller: nameController,
                maxLines: null,
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
                  hintText: 'Name', hintStyle: const TextStyle(color:Colors.grey,fontSize:14,fontWeight: FontWeight.normal),
                ),
              ),
              // const SizedBox(height:10),
              const SizedBox(height:10),
              TextFormField(
                focusNode: descFocusNode,
                onFieldSubmitted: (term){
                  descFocusNode.unfocus();
                },
                controller: descController,
                maxLines: null,
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
              _isEdit?const Divider():Container(),
              _isEdit?TextButton.icon(
                icon: const Icon(Icons.list),
                label: Text('VIEW ITEMS',style: TextStyle(fontSize: 16)),
                onPressed: (){
                  print('Adding Items');
                  Store _store = Store(
                      id:widget.store.id,
                      name: nameController.text,
                      description: descController.text,
                      lat: _latlng.latitude,
                      long: _latlng.longitude
                  );
                  Navigator.pop(context);
                  Navigator.push(context, createRoute(ShowItems(store: _store)));
                },
              ):Container(),
              const Divider(),
              Container(
                  padding: const EdgeInsets.all(10),
                  child: Row(
                    children: <Widget>[
                      InkWell(
                        onTap:(){
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
                          print('Creating');
                          Store _store = Store(
                            id:_isEdit?widget.store.id:'1',
                            name: nameController.text,
                            description: descController.text,
                            lat: _latlng.latitude,
                            long: _latlng.longitude
                          );
                          createStore(_store,_isEdit);
                          Navigator.push(context, createRoute(const MyHomePage(title: 'Store created')));
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