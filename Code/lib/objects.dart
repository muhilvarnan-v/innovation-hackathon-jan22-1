import 'package:geolocator/geolocator.dart';

class Store {
  String id;
  String name;
  String description;
  double lat;
  double long;

  Store({required this.id,required this.description,required this.lat,required this.name,required this.long});
}

class Item {
  String mainId;
  String id;
  String name;
  String description;
  double price;
  String image;
  String quantity;

  Item({required this.mainId,required this.id,required this.description,required this.image,required this.name,required this.price,required this.quantity});
}

class Cart {
  Item product;
  double price;
  int quantity;
  String status;

  Cart(this.product,this.price,this.quantity,this.status);
}

class AddressDetails {
  String address;
  String houseNo;
  Position position;
  AddressDetails({required this.address,required this.position, required this.houseNo});
}