import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:geolocator/geolocator.dart';

import 'constants.dart';
import 'objects.dart';
import 'product.dart';

typedef void CartChangedCallback(Item product, bool inCart, int quantity);

class NewProductListItem extends StatefulWidget{
  NewProductListItem({required Item product, required this.inCart, required this.onCartChanged,required this.store})
      : product = product,
        super(key: ObjectKey(product));

  final Item product;
  final bool inCart;
  final Store store;
  final CartChangedCallback onCartChanged;

  @override
  State<StatefulWidget> createState() {
    return _ProductListItemState();
  }
}

class _ProductListItemState extends State<NewProductListItem> {
  late Item product;
  late bool inCart;
  late CartChangedCallback onCartChanged;
  int count = 0;
  final db = FirebaseFirestore.instance;
  bool subscribed = false;
  bool _isValid=false;
  int rateCount=0;
  int rateValue = 0;

  void initState() {
    product=widget.product;
    inCart = widget.inCart;
    onCartChanged = widget.onCartChanged;
    super.initState();
  }

  @override
  void dispose() {
    PaintingBinding.instance?.imageCache?.clear();
    super.dispose();
  }

  String _getTextStyle(BuildContext context) {
    return count.toString();
  }

  @override
  Widget build(BuildContext context) {

    return
      new Card(
          elevation: 0,
          child: Container(
            padding:EdgeInsets.only(top:20,bottom: 10),
            child:Column(
              children: <Widget>[
                Container(height:150,
                  child:NewProduct(product:product,store: widget.store,),
                ),
                Container(
                    width:180,
                    child:Column(
                      children: [
                        Divider(),
                        new Row(
                          mainAxisAlignment: MainAxisAlignment.spaceAround,
                          children: <Widget>[
                            new MaterialButton(
                              height: 25.0,
                              minWidth: 60.0,
                              color: buttonColor,
                              shape: new CircleBorder(),
                              textColor: buttonLabelColor,
                              child: new Icon(
                                Icons.remove,
                                color: buttonLabelColor,
                                size: 20.0,
                              ),
                              onPressed: () {
                                if(count>0)
                                  count--;
                                onCartChanged(product,true,count);
                              },
                              splashColor: Colors.redAccent,
                            ),
                            SizedBox(
                              width:10.0,
                              child:Text(_getTextStyle(context),style: TextStyle(fontSize: 16.0,fontWeight: count>0?FontWeight.normal:FontWeight.normal,color: count>0?blackColor:fontColor),textAlign: TextAlign.center,),
                            ),
                            new MaterialButton(
                              height: 25.0,
                              minWidth: 60.0,
                              color: buttonColor,
                              shape: new CircleBorder(),
                              textColor: buttonLabelColor,
                              child: new Icon(
                                Icons.add,
                                color: buttonLabelColor,
                                size: 20.0,
                              ),
                              onPressed: () {
                                    count++;
                                    onCartChanged(product,false, count);
                              },
                              splashColor: Colors.redAccent,
                            ),
                          ],
                        ),
                      ],
                    )
                ),

              ],
            ),
          )
      );
  }
}