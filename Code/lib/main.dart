import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/material.dart';
import 'package:gigboat/addstore.dart';
import 'package:gigboat/constants.dart';
import 'package:gigboat/utilities.dart';

import 'barcode.dart';
import 'data.dart';
import 'objects.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  if (Firebase.apps==null) {
    await Firebase.initializeApp(
      options: const FirebaseOptions(
          apiKey: "AIzaSyCFIPqdnwfJC-mHlvO-s4eYEiJd4n5OZxo",
          authDomain: "ondcgigboat.firebaseapp.com",
          projectId: "ondcgigboat",
          storageBucket: "ondcgigboat.appspot.com",
          messagingSenderId: "827460537032",
          appId: "1:827460537032:web:b09123f4ab9b7c1b1033fd"
      ),
    );
  }else {
    await Firebase.initializeApp(); // if already initialized, use that one
  }
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'GigBoat',
      theme: ThemeData(fontFamily: 'Gotham'),
      home: const MyHomePage(title: 'Welcome to GigBoat Store'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({Key? key, required this.title}) : super(key: key);
  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  List<Store> _stores = [];
  final databaseReference = FirebaseFirestore.instance;
  bool isLargeScreen = true;

  void _addStore(Store store) {
    Navigator.push(context, createRoute(AddStore(store:store,isEdit: false,)));
  }

  void _getStore(Store store) {
    Navigator.push(context, createRoute(AddStore(store:store,isEdit: true,)));
  }

  Widget _addStoreWidget(Store store) {
    return Card(
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(15.0),
          ),
          child: Container(
            height: MediaQuery.of(context).size.height/2,
            padding:const EdgeInsets.all(20),
            child:Column(
              children: <Widget>[
                store.name=='ADD'?InkWell(
                  child: ListTile(
                    leading: const Icon(Icons.add, size: 60),
                    title: Text(
                        store.name,
                        style: const TextStyle(fontSize: 30.0)
                    ),
                    subtitle: Text(
                        store.description,
                        style: const TextStyle(fontSize: 18.0)
                    ),
                  ),
                  onTap: () {
                    _addStore(store);
                  },
                ):InkWell(
                  child: ListTile(
                    title: Text(
                        store.name,
                        style: const TextStyle(fontSize: 30.0)
                    ),
                    subtitle: Text(
                        store.description,
                        style: const TextStyle(fontSize: 18.0)
                    ),
                  ),
                  onTap: () {
                    _getStore(store);
                  },
                ),
              ],
            ),
          )
      );
  }

  Widget _listStores() {
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
        itemCount: _stores.length,
        itemBuilder: (context, index) {
          return _addStoreWidget(_stores[index]);
        }
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey[100],
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: Container(
        padding: const EdgeInsets.all(10),
        child: _listStores(),
      ),
      floatingActionButtonLocation: FloatingActionButtonLocation.endTop,
      floatingActionButton: FloatingActionButton(
        backgroundColor: buttonColor,
        onPressed: (){
          Store store = new Store(
            id:'',
            name: '',
            description: '',
            lat: 0.0,
            long: 0.0
          );
          Navigator.push(context, createRoute(AddStore(store:store,isEdit: false,)));
        },
        tooltip: 'Increment',
        child: const Icon(Icons.add),
      ), // This trailing comma makes auto-formatting nicer for build methods.
    );
  }

  @override
  void initState() {
    super.initState();
    getStores().then((stores) {
      setState(() {
        _stores.addAll(stores);
      });
    });
    _stores.add(Store(id:'1',name: 'ADD',description: 'Add your stores',lat: 0.0,long:0.0));
  }
}