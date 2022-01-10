import 'package:flutter/material.dart';
import 'package:photo_view/photo_view.dart';

import 'constants.dart';
import 'objects.dart';

Route createRoute(Widget myChildPage) {
  return PageRouteBuilder(
    pageBuilder: (context, animation, secondaryAnimation) => myChildPage,
    transitionsBuilder: (context, animation, secondaryAnimation, child) {
      return child;
    },
  );
}

Text getCurrencySymbol() {
  return Text('\u{20B9}',style: new TextStyle(fontSize: fontSize,fontWeight: FontWeight.bold, color: waitColor),maxLines: 2,textAlign: TextAlign.start,);
}

zoomImage(context, String image) {
  showDialog(
      context: context,
      builder: (BuildContext context) {
        return Scaffold(
            floatingActionButton:FloatingActionButton(
              backgroundColor: buttonLabelColor,
              onPressed: () {
                Navigator.of(context).pop(false);
              },
              tooltip: 'Back',
              child: const Icon(Icons.arrow_back_ios,color: Colors.orange,),
            ),
            body: Container(
                child: PhotoView(
                  imageProvider: NetworkImage(
                    image,
                  ),
                )
            ));
      });
}

double getPrice(List<Item> shoppingCart) {
  double price = 0;
  for(Item a in shoppingCart) {
    price = price + a.price;
  }
  return price;
}