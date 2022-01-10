import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';
import 'package:gigboat/additems.dart';
import 'package:gigboat/constants.dart';
import 'package:gigboat/data.dart';
import 'package:gigboat/utilities.dart';

import 'objects.dart';
import 'products.dart';

class ShowItems extends StatefulWidget {
  const ShowItems({Key? key,required this.store}) : super(key: key);
  final Store store;
  @override
  State<ShowItems> createState() => _ShowItemsState();
}

class _ShowItemsState extends State<ShowItems> {
  final databaseReference = FirebaseFirestore.instance;
  bool isLargeScreen = true;
  List<Item> _items = [];

  void _addItem(Item item) {
    Navigator.push(context, createRoute(AddItems(store:widget.store,isEdit: false,item:item)));
  }

  void _getItem(Item item) {
    Navigator.push(context, createRoute(AddItems(store:widget.store,isEdit: true,item: item,)));
  }

  Widget _addItemWidget(Item item) {
    return Card(
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(15.0),
        ),
        child: Container(
          height: MediaQuery.of(context).size.height/2,
          padding:const EdgeInsets.all(20),
          child:Column(
            children: <Widget>[
              item.name=='ADD'?InkWell(
                child: ListTile(
                  leading: const Icon(Icons.add, size: 60),
                  title: Text(
                      item.name,
                      style: const TextStyle(fontSize: 30.0)
                  ),
                  subtitle: Text(
                      item.description,
                      style: const TextStyle(fontSize: 18.0)
                  ),
                ),
                onTap: () {
                  _addItem(item);
                },
              ):InkWell(
                child: ListTile(
                  title: Text(
                      item.name,
                      style: const TextStyle(fontSize: 30.0)
                  ),
                  subtitle: Text(
                      item.description,
                      style: const TextStyle(fontSize: 18.0)
                  ),
                ),
                onTap: () {
                  _getItem(item);
                },
              ),
            ],
          ),
        )
    );
  }

  Widget _listItems() {
    int _axis = 3;
    if (MediaQuery.of(context).size.width > 600) {
      _axis = 3;
    } else {
      _axis = 1;
    }
    return GridView.builder(
        primary: true,
        gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
            crossAxisCount:_axis,
            childAspectRatio: 3
        ),
        itemCount: _items.length,
        itemBuilder: (context, index) {
          return _addItemWidget(_items[index]);
        }
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey[100],
      appBar: AppBar(
        title: Text('ITEMS'),
      ),
      body: Container(
        // padding: const EdgeInsets.all(10),
        child: AllProductList(products:_items,store:widget.store),
      ),
      floatingActionButtonLocation: FloatingActionButtonLocation.endTop,
      floatingActionButton: FloatingActionButton(
        backgroundColor: buttonColor,
        onPressed: (){
          Item item = new Item(
              mainId: '1',
              id: '',
              name: '',
              description: '',
              price: 0,
              quantity: '0',
              image: ''
          );
          Navigator.push(context, createRoute(AddItems(store:widget.store,isEdit: false,item:item)));
        },
        tooltip: 'Increment',
        child: const Icon(Icons.add),
      ), // This trailing comma makes auto-formatting nicer for build methods.
    );
  }

  @override
  void initState() {
    super.initState();
    getItems(widget.store).then((stores) {
      setState(() {
        _items.addAll(stores);
      });
    });
    // _items.add(Item(id:'1',name: 'ADD',description: 'Add items to '+widget.store.name, image: '', quantity: 0, mainId: 1, price: 0.0));
  }
}