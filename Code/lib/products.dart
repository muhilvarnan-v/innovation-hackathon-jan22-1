import 'package:flutter/material.dart';
import 'package:geolocator/geolocator.dart';
import 'constants.dart';
import 'objects.dart';
import 'productitem.dart';
import 'utilities.dart';

class AllProductList extends StatefulWidget{
  AllProductList({required this.products,required this.store});
  final List<Item> products;
  final Store store;

  @override
  State<StatefulWidget> createState() {
    print('products products = '+this.products.length.toString());
    return _ProductListState();
  }
}

typedef void CartChangedCallback(bool showAdd);

class _ProductListState extends State<AllProductList> {
  List <Item>_shoppingCart = [];
  List <Cart> carts = [];
  late Cart _cart;
  bool isLoading = false;
  List <Item> data=[];
  int page = 0;
  int pages = 0;
  int chuckSize = 8;
  List productPages = [];
  int _changedIndex = 0;
  bool cart =true;

  ScrollController _scrollController = ScrollController();
  List<Item> items = [];

  _scrollListener() async {
    if (_scrollController.position.pixels ==
        _scrollController.position.maxScrollExtent) {
      if(this.mounted)setState(() {
        isLoading = true;
      });
      await new Future.delayed(new Duration(seconds: 1));
      if(mounted)setState(() {
        page++;
        isLoading = false;
      });
    }
  }

  _buildChunks() async {
    List chunks = [];
    int len = widget.products.length;

    for (var i = 0; i < len; i += chuckSize) {
      int size = i+chuckSize;
      chunks.add(widget.products.sublist(i, size > len ? len : size));
    }
    if(this.mounted)setState(() {
      productPages = chunks;
      pages = chunks.length;
      if(page<pages) {
        List<Item> temp = productPages[page];
        if(items.length > 0) {
          temp.forEach((element) {
            if(items.contains(element)) {

            } else {
              items.addAll(productPages[page]);
            }
          });
        } else {
          items.addAll(productPages[page]);
        }
      }
    });
  }

  void _handleCartChanged(Item product,bool inCart,int quantity) {
    setState(() {
      cart =false;
      if (!inCart) {
        if(_shoppingCart.contains(product)) {
          print('Contains == ');
          _cart = carts.firstWhere((item) => item.product.id == product.id);
          _cart.quantity=1;
          _cart.price=product.price;
          carts.add(_cart);
        } else {
          _cart = new Cart(product,product.price,quantity,'Connecting');
          carts.add(_cart);
        }
        _shoppingCart.add(product);
      }
      else {
        if(_shoppingCart.contains(product)) {
          _cart = carts.firstWhere((item) => item.product.id == product.id);
          carts.remove(_cart);
        }
        _shoppingCart.remove(product);
      }
    }
    );
  }

  void _handleCartItemsChanged(Item product,int quantity) {
    setState(() {
      cart =false;
      if(_shoppingCart.contains(product)) {
        _cart = carts.firstWhere((item) => item.product.id == product.id);
        carts.remove(_cart);
      }
      _shoppingCart.remove(product);
    });
  }

  @override
  void initState() {
    super.initState();
    _scrollController.addListener(_scrollListener);
  }

  @override
  void dispose() {
    _scrollController.dispose();
    super.dispose();
  }

  void _handleBackPress() {
    setState(() {
      _shoppingCart.clear();
    });
  }

  getList() {
    try {
      List <Item> newItems = widget.products;
      setState(() {
        if (data == null) {
          data = newItems;
        } else {
          if (data != newItems) {
            data.addAll(newItems);
            isLoading = false;
          }
          isLoading = false;
        }
      });
    } on Exception catch (error) {
      debugPrint(error.toString());
    }
  }

  @override
  Widget build(BuildContext context) {
    return _buildPaginatedView();//_buildPage(context,widget.products);
  }

  Widget _buildPaginatedView () {
    if(!isLoading)_buildChunks();
    return Column(
      children: <Widget>[
        Expanded(
            child: GridView.builder(
                cacheExtent:1000,
                physics: ClampingScrollPhysics(),
                controller: _scrollController,
                gridDelegate: new SliverGridDelegateWithFixedCrossAxisCount(
                  crossAxisCount:2,
                  childAspectRatio: 0.7,
                ),
                itemCount: items.length,
                itemBuilder: (context, index) {
                  return Container(
                      child: NewProductListItem(
                        product: items[index],
                        inCart: _shoppingCart.contains(data),
                        onCartChanged: _handleCartChanged,
                        store: widget.store,
                      )
                  );
                }
            )
        ),
        Container(
          height: isLoading ? 50.0 : 0,
          color: Colors.transparent,
          child: Center(
            child: new CircularProgressIndicator(),
          ),
        ),
        _shoppingCart.length>0?
        Card(
            color:buttonColor,
            margin: EdgeInsets.only(left:0,right:0,bottom: 0),
            shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.only(topLeft: Radius.circular(10),topRight: Radius.circular(10))),
            elevation: 4,
            child: Padding(
                padding: EdgeInsets.fromLTRB(0,10,0,10),
                child:Row (
                  crossAxisAlignment: CrossAxisAlignment.center,
                  mainAxisAlignment: MainAxisAlignment.spaceAround,
                  children: <Widget>[
                    InkWell(
                      onTap: () {
                        // Navigator.push(context,createRoute(CartItems(cart:carts,onCartChanged:_handleCartItemsChanged)));
                      },
                      child: Card(
                        elevation: 0,
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(100.0),
                        ),
                        child:Container(
                            padding: EdgeInsets.fromLTRB(10,10,10,10),
                            width:40,
                            height:40,
                            child: Center(
                              child: Text(_shoppingCart.length.toString(), style: TextStyle(fontWeight: FontWeight.bold, color: buttonColor,fontSize: 15)),
                            )
                        ),
                      ),
                    ),
                    Padding(
                      padding: EdgeInsets.fromLTRB(0,10,0,10),
                      child: Column (
                        children: <Widget>[
                          Text('TOTAL COST',style: TextStyle(fontWeight: FontWeight.bold, color: buttonLabelColor)),
                          Text(getPrice(_shoppingCart).toString(), style: TextStyle(fontWeight: FontWeight.bold, color: buttonLabelColor)),
                        ],
                      ),
                    ),
                    FlatButton(
                      color: buttonLabelColor,
                      child: Text('BOOK',style: TextStyle(fontSize: 16.0, color: buttonColor)),
                      onPressed: () {

                        },
                    ),
                  ],
                )
            )
        ) :Text(''),
      ],
    );
  }
}