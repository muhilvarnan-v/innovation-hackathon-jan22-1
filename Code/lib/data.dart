import 'dart:async';

import 'package:cloud_firestore/cloud_firestore.dart';

import 'objects.dart';

final databaseReference = FirebaseFirestore.instance;

Future<void> createStore(Store store,bool isEdit) async {
  if(isEdit) {
    print(store.id);
    await databaseReference.collection("Store").doc(store.id).update({
      'name': store.name,
      'desc': store.description,
      'latitude': store.lat,
      'longitude': store.long,
    });
  } else {
    databaseReference.collection('Store').add({
      'name': store.name,
      'id': FieldValue.increment(1),
      'desc': store.description,
      'latitude': store.lat,
      'longitude': store.long,
      'creator': '_userId',
      'created': DateTime.now(),
    }).then((value) {
      print(value.id);
    });
  }
}

Future<void> createItem(Store store, Item item,bool isEdit) async {
  if(isEdit) {
    await databaseReference.collection("Store").doc(store.id).collection('items').doc(item.id).update({
      'name': item.name,
      'desc': item.description,
      'price': item.price,
      'image': item.image,
      'quantity': item.quantity,
      'mainId':item.mainId
    });
  } else {
    databaseReference.collection("Store").doc(store.id).collection('items').add({
      'name': item.name,
      'mainId': item.mainId,
      'desc': item.description,
      'price': item.price,
      'image': item.image,
      'quantity': item.quantity,
      'creator': '_userId',
      'created': DateTime.now(),
    }).then((value) {
      print(value.id);
    });
  }
}

Future<List<Store>> getStores() {
  List<Store> _categoryList = [];
  Completer<List<Store>> completer = new Completer<List<Store>>();

  FirebaseFirestore.instance
      .collection('Store') //.orderBy('name')
      .get()
      .then((QuerySnapshot snapshot) {
    snapshot.docs.forEach((yearMap) {
// //Map<dynamic, dynamic> yearMap = f.data;
      _categoryList.add(
        Store(
          id:yearMap.id,
          name:yearMap['name'],
          description: yearMap['desc'],
          lat: yearMap['latitude'],
          long:yearMap['longitude'],
        ),
      );
    });
    completer.complete(_categoryList);
  });
  return completer.future;
}

Future<List<Item>> getItems(Store store) {
  List<Item> _categoryList = [];
  Completer<List<Item>> completer = new Completer<List<Item>>();

  FirebaseFirestore.instance
      .collection('Store').doc(store.id) .collection('items')//.orderBy('name')
      .get()
      .then((QuerySnapshot snapshot) {
    snapshot.docs.forEach((yearMap) {
// //Map<dynamic, dynamic> yearMap = f.data;
      _categoryList.add(
        Item(
          mainId: yearMap['mainId'],
          id:yearMap.id,
          name:yearMap['name'],
          description: yearMap['desc'],
          price: yearMap['price'],
          image:yearMap['image'], quantity: yearMap['quantity'],
        ),
      );
    });
    completer.complete(_categoryList);
  });
  return completer.future;
}
