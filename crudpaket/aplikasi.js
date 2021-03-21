const StorageCtrl = (function(){

  return {
    paketKursus: function(item){
      let items;

      if(localStorage.getItem('items') === null){
        items = [];

        items.push(item);

        localStorage.setItem('items', JSON.stringify(items));
      }else {

        items = JSON.parse(localStorage.getItem('items'));

        items.push(item);

        localStorage.setItem('items', JSON.stringify(items));
      }
    },

    getItemsFromStorage: function(){
      let items;

      if(localStorage.getItem('items') === null){
        items = [];
      } else {
        items = JSON.parse(localStorage.getItem('items'));
      }
        return items;
    },
    updateItemStorage: function(updatedItem){
      let items = JSON.parse(localStorage.getItem('items'));

      items.forEach(function(item, index){
        if(updatedItem.id === item.id){
          items.splice(index, 1, updatedItem);
        }

      });
      localStorage.setItem('items', JSON.stringify(items));

    },
    deleteItemFromStorage: function(id){

      let items = JSON.parse(localStorage.getItem('items'));

      items.forEach(function(item, index){
        if(id === item.id){
          items.splice(index, 1); //jika murid ada salah pas diakhir maka itemnya tambahkan s
        }
      });
      localStorage.setItem('items', JSON.stringify(items)); //jika murid ada salah pas diakhir maka itemnya tambahkan s
    },
    clearItemsFromStorage: function(){
      localStorage.removeItem('items');

    }

  }
})();

const ItemCtrl = (function(){

  const Item = function(id, nama, harga){
    this.id     = id;
    this.nama   = nama;
    this.harga  = harga;
  }

  const data = {
    // items: [
    //   // {id: 0, nama: 'seo', harga: 120000},
    //   // {id: 1, nama: 'google adword', harga: 200000},
    //   // {id: 2, nama: 'FB', harga: 150000}

    // ],

    items: StorageCtrl.getItemsFromStorage(),

    currenItem: null,
    totalHarga: 0
  }

  return {
    geItems : function(){
      return data.items;
    },
    addItem: function(nama, harga){
      let ID;

      if(data.items.length > 0){
        ID = data.items[data.items.length -1].id + 1;
      }else {
        ID = 0;
      }

      harga = parseInt(harga);

      newItem = new Item(ID, nama, harga);

      data.items.push(newItem);

      return newItem;
    },
    getItemById : function(id){
      //untuk buat id
      let found = null;

      data.items.forEach(function(item){
        if(item.id === id){
          found = item;
        }
      });
      return found;
    },
    updateItem : function(nama, harga){
      harga = parseInt(harga);

      let found = null;

      data.items.forEach(function(item){
        if(item.id === data.currenItem.id){
          item.nama  = nama;
          item.harga = harga;
          found      = item;
        }
      });

      return found;
    },
     
    deleteItem: function(id){

      // get id
      const ids = data.items.map(function(item){

        return item.id;
      });

      const index = ids.indexOf(id);


      data.items.splice(index, 1);
    },

    clearAllItem: function(){

      data.items = [];
    },
    setCurrenItem: function (item){
      data.currenItem = item;
    },
    getCurrentItem: function(){
      return data.currenItem;
    },
    getTotalHarga:function(){
      let total = 0;

      //looping item dan tambah class
      data.items.forEach(function(item){
        total += item.harga;
      });

      //set total data
      data.totalHarga = total;

      //return total
      return data.totalHarga;

    },
    logData: function(){
      return data;
    }
  }
})();


const UICtrl = (function(){
  const UISelector  = {
    itemList      : '#item-list',
    addBtn        : '.add-btn',
    listItems     : '#item-list li',
    updateBtn     : '.update-btn',
    deleteBtn     : '.delete-btn',
    clearBtn      : '.clear-btn',
    backBtn       : '.back-btn',
    itemNamaPaket : '#nama-paket',
    iteHargaPaket : '#harga-paket',
    totalHarga    : '.total-harga'
  }

  return {

    populateItemList: function(items){
      let html = '';

      items.forEach(function(item){
        html += `<li class="collection-item" id="item-${item.id}">
            <strong>${item.nama}</strong><em>Rp. ${item.harga}</em>
            <a href="#" class="secondary-content">
              <i class="edit-item fa fa-pencil"></i>
            </a>
          </li>`;
      });


      document.querySelector(UISelector.itemList).innerHTML = html;
    },
    getItemInput: function(){
      return {
        nama : document.querySelector(UISelector.itemNamaPaket).value,
        harga: document.querySelector(UISelector.iteHargaPaket).value
      }
    },

    addListItem: function(item){

      document.querySelector(UISelector.itemList).style.display = 'block';
      const li = document.createElement('li');

      li.className = 'collection-item';

      li.id = `item-${item.id}`;

      li.innerHTML = `<strong>${item.nama}</strong><em>Rp. ${item.harga}</em>
            <a href="#" class="secondary-content">
              <i class="edit-item fa fa-pencil"></i>
            </a>`;

       document.querySelector(UISelector.itemList).insertAdjacentElement('beforeend',li)

    },
    
    updateListItem: function(item){

      let listItems = document.querySelectorAll(UISelector.listItems);

      listItems = Array.from(listItems);
      listItems.forEach(function(listItem){
        const itemID = listItem.getAttribute('id');

        if(itemID === `item-${item.id}`){

          document.querySelector(`#${itemID}`).innerHTML = `<li class="collection-item" id="item-${item.id}">
            <strong>${item.nama}</strong><em>Rp. ${item.harga}</em>
            <a href="#" class="secondary-content">
              <i class="edit-item fa fa-pencil"></i>
            </a>
          </li>`;
        }
      });
    },

    deleteListItem: function(id){
        const itemID = `#item-${id}`;

        const item = document.querySelector(itemID);
        item.remove();
    },
    clearInput: function(){
      document.querySelector(UISelector.itemNamaPaket).value = '';
      document.querySelector(UISelector.iteHargaPaket).value = '';
    },
    addItemToForm: function(){
      document.querySelector(UISelector.itemNamaPaket).value = ItemCtrl.getCurrentItem().nama;
      document.querySelector(UISelector.iteHargaPaket).value = ItemCtrl.getCurrentItem().harga;

      UICtrl.showEditState();
    },

    removeItems: function(){

       let listItems = document.querySelectorAll(UISelector.listItems);

       listItems = Array.from(listItems);

       listItems.forEach(function(item){
        item.remove();
       });
    },

    hideList: function(){
      document.querySelector(UISelector.itemList).style.display = 'none';
    },

    
    showTotalHarga: function(totalHarga){
      document.querySelector(UISelector.totalHarga).textContent = totalHarga;
    },
    
    clearEditState: function(){
      UICtrl.clearInput();
      document.querySelector(UISelector.updateBtn).style.display = 'none';
      document.querySelector(UISelector.deleteBtn).style.display = 'none';
      document.querySelector(UISelector.backBtn).style.display = 'none';
      document.querySelector(UISelector.addBtn).style.display = 'inline';
    },
    showEditState: function(){
      document.querySelector(UISelector.updateBtn).style.display = 'inline';
      document.querySelector(UISelector.deleteBtn).style.display = 'inline';
      document.querySelector(UISelector.backBtn).style.display = 'inline';
      document.querySelector(UISelector.addBtn).style.display = 'none';
    },
    getSelectors: function(){
      return UISelector;
    }
    


  }
})();



const App = (function(ItemCtrl,StorageCtrl, UICtrl){


  const loadEventListeners = function(){

    const UISelector = UICtrl.getSelectors();

    //simpan data
    document.querySelector(UISelector.addBtn).addEventListener('click',itemAddSubmit);

    //agar enter tidak berfungsi
    document.addEventListener('keypress', function(e){
      if(e.keyCode === 13 || e.which === 13){

        e.preventDefault;
        return false;
      }
    });

    //edit clik data insert to form

    document.querySelector(UISelector.itemList).addEventListener('click', itemEditClick);

    //untuk update data
    document.querySelector(UISelector.updateBtn).addEventListener('click', itemUpdateSubmit);


    // DELET button

    document.querySelector(UISelector.deleteBtn).addEventListener('click', itemDeleteSubmit);

    //back button event

     document.querySelector(UISelector.backBtn).addEventListener('click', UICtrl.clearEditState);


     // untuk hapus semua data

      document.querySelector(UISelector.clearBtn).addEventListener('click', clearAllItemClick);
  }
  //ini untuk insert
  const itemAddSubmit = function(e){

    const input = UICtrl.getItemInput();

    if(input.nama !== '' && input.harga !== ''){
      const newItem = ItemCtrl.addItem(input.nama, input.harga);

    UICtrl.addListItem(newItem);

    const totalHarga = ItemCtrl.getTotalHarga();

    //add total harga to UI
    UICtrl.showTotalHarga(totalHarga);

    StorageCtrl.paketKursus(newItem);

    UICtrl.clearInput();
    }
    e.preventDefault();
  }
  //untuk klik data berdasarkan id
  const itemEditClick = function(e){
    if(e.target.classList.contains('edit-item')){

      //mengambil list item id
      const listId = e.target.parentNode.parentNode.id;
      //masuk kedalam sebuah array
      const lisstIdArr = listId.split('-');
      //AMBIL ID YANG SEBENARNYA
      const id = parseInt(lisstIdArr[1]);
      //ambil item
      const itemToEdit = ItemCtrl.getItemById(id);

      ItemCtrl.setCurrenItem(itemToEdit);

      UICtrl.addItemToForm()
    }
    e.preventDefault();
  }

  // update data 
  const itemUpdateSubmit = function (e){

    // untuk mengambil nilai input
    const input = UICtrl.getItemInput();

    const updatedItem = ItemCtrl.updateItem(input.nama, input.harga);


    UICtrl.updateListItem(updatedItem);

    const totalHarga = ItemCtrl.getTotalHarga();

    UICtrl.showTotalHarga(totalHarga);
    StorageCtrl.updateItemStorage(updatedItem);
    UICtrl.clearEditState();


    e.preventDefault();
  }
  

  // delet button even

  const itemDeleteSubmit = function(e){

    // untuk mengambil item yang akan kita hapus
    const currenItem = ItemCtrl.getCurrentItem();

    // hapus struktur data berdasarkan id
    ItemCtrl.deleteItem(currenItem.id);

    // untuk menghapus form di ui
    UICtrl.deleteListItem(currenItem.id);

    const totalHarga = ItemCtrl.getTotalHarga();

    UICtrl.showTotalHarga(totalHarga);
    
    UICtrl.clearEditState();
    StorageCtrl.deleteItemFromStorage(currenItem.id);
    e.preventDefault();

  }

  const clearAllItemClick = function(){

    // hapus semua data yang ada di table / form
    ItemCtrl.clearAllItem();

    const totalHarga = ItemCtrl.getTotalHarga();

    UICtrl.showTotalHarga(totalHarga);

    UICtrl.removeItems();
    StorageCtrl.clearItemsFromStorage();
    // HIDE UL
    UICtrl.hideList();


  }
 return {
    init: function(){

      UICtrl.clearEditState();
      const items = ItemCtrl.geItems();

      if(items.length === 0){
        UICtrl.hideList();
      } else {
        UICtrl.populateItemList(items);
      }
      
      const totalHarga = ItemCtrl.getTotalHarga();

        //add total harga to UI
      UICtrl.showTotalHarga(totalHarga);


      loadEventListeners();
    }
  }
})(ItemCtrl,StorageCtrl, UICtrl);

App.init();