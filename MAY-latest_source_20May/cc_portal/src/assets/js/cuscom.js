

function processPrint(blockid) {

    var StyleCode = document.getElementById("cStylecode").innerHTML == "undefined" ? "" : document.getElementById("cStylecode").innerHTML;
    var ReceiptDate = document.getElementById("cReceiptDate").innerHTML == "undefined" ? "" : document.getElementById("cReceiptDate").innerHTML;
    var From = document.getElementById("cfromtype").innerHTML == "undefined" ? "" : document.getElementById("cfromtype").innerHTML;
    var Sleeve = document.getElementById("cSleeve").innerHTML == "undefined" ? "" : document.getElementById("cSleeve").innerHTML;
    var SizeCode = document.getElementById("cSizeCode").innerHTML == "undefined" ? "" : document.getElementById("cSizeCode").innerHTML;
    var GarmentColor = document.getElementById("cGarmentColor").innerHTML == "undefined" ? "" : document.getElementById("cGarmentColor").innerHTML; 
    var FabricCode = document.getElementById("cFabricCode").innerHTML == "undefined" ? "" : document.getElementById("cFabricCode").innerHTML; 
    var CustomerName = document.getElementById("cCustomerName").innerHTML == "undefined" ? "" : document.getElementById("cCustomerName").innerHTML;
    var CustomerAddress = document.getElementById("cCustomerAddress").innerHTML == "undefined" ? "" : document.getElementById("cCustomerAddress").innerHTML;
    var CustCity = document.getElementById("cCustCity").innerHTML == "undefined" ? "" : document.getElementById("cCustCity").innerHTML;
    var CustPin = document.getElementById("cCustPin").innerHTML == "undefined" ? "" : document.getElementById("cCustPin").innerHTML;
    var CustomerMobile = document.getElementById("cCustomerMobile").innerHTML == "undefined" ? "" : document.getElementById("cCustomerMobile").innerHTML;
    var CustomerEmail = document.getElementById("cCustomerEmail").innerHTML == "undefined" ? "" : document.getElementById("cCustomerEmail").innerHTML;
    var ReturnReason = document.getElementById("cReturnReason").innerHTML == "undefined" ? "" : document.getElementById("cReturnReason").innerHTML;
    var BillNo = document.getElementById("cBillNo").innerHTML == "undefined" ? "" : document.getElementById("cBillNo").innerHTML;
    var BillDate = document.getElementById("cBillDate").innerHTML == "undefined" ? "" : document.getElementById("cBillDate").innerHTML;
    var GarmentMRP = document.getElementById("cGarmentMRP").innerHTML == "undefined" ? "" : document.getElementById("cGarmentMRP").innerHTML;
    var NoofWashes = document.getElementById("cNoofWashes").innerHTML == "undefined" ? "" : document.getElementById("cNoofWashes").innerHTML;
    var UserComments = document.getElementById("cUserComments").innerHTML == "undefined" ? "" : document.getElementById("cUserComments").innerHTML;
    var StoreContact = document.getElementById("cStoreContact").innerHTML == "undefined" ? "" : document.getElementById("cStoreContact").innerHTML;
    var StorePhNo = document.getElementById("cStorePhNo").innerHTML == "undefined" ? "" : document.getElementById("cStorePhNo").innerHTML;
    var serialNo = document.getElementById("compdetails").innerHTML == "undefined" ? "" : document.getElementById("compdetails").innerHTML;
    var gAutoPrint = true;

    if (document.getElementById != null) {
  
      var html = '<HTML>\n<HEAD>\n';
  
      if (document.getElementsByTagName != null) {
  
        var headTags = document.getElementsByTagName("head");
  
        if (headTags.length > 0) html += headTags[0].innerHTML;
  
      }
  
      html += '\n</HE' + 'AD>\n<BODY>\n';
      
      var printReadyElem = '<h3 style="text-align:center">'+serialNo+'</h3><table style="margin-left:auto;margin-right:auto;" width="500" border="3"><tr><td style="padding:2px"><b>Style Code</b></td><td width="70%" style="padding:2px;">'+StyleCode+'</td></tr><tr><td style="padding:2px;"><b>Reciept Date</b></td><td style="padding:2px;">'+ReceiptDate+'</td></tr><tr><td style="padding:2px;"><b>From</b></td><td style="padding:2px;">'+From+'</td></tr><tr><td style="padding:2px;"><b>Sleeve</b></td><td style="padding:2px;">'+Sleeve+'</td></tr><tr><td style="padding:2px;"><b>Size Code</b></td><td style="padding:2px;">'+SizeCode+'</td></tr><tr><td style="padding:2px;"><b>Garment Color</b></td><td style="padding:2px;">'+GarmentColor+'</td></tr><tr><td style="padding:2px;"><b>Fabric Code</b></td><td style="padding:2px;">'+FabricCode+'</td></tr><tr><td style="padding:2px;"><b>Customer Name</b></td><td style="padding:2px;">'+CustomerName+'</td></tr><tr><td style="padding:2px;"><b>Customer Address</b></td><td style="padding:2px;">'+CustomerAddress+'</td></tr><tr><td style="padding:2px;"><b>City<b/></td><td style="padding:2px;">'+CustCity+'</td></tr><tr><td style="padding:2px;"><b>Pincode</b></td><td style="padding:2px;">'+CustPin+'</td></tr><tr><td style="padding:2px;"><b>Mobile</b></td><td style="padding:2px;">'+CustomerMobile+'</td></tr><tr><td style="padding:2px;"><b>Email</b></td><td style="padding:2px;">'+CustomerEmail+'</td></tr><tr><td style="padding:2px;"><b>Customer Comments</b></td><td style="padding:2px;">'+ReturnReason+'</td></tr><tr><td style="padding:2px;"><b>Bill No</b></td><td style="padding:2px;">'+BillNo+'</td></tr><tr><td style="padding:2px;"><b>Bill Date</b></td><td style="padding:2px;">'+BillDate+'</td></tr><tr><td style="padding:2px;"><b>Garment MRP</b></td><td style="padding:2px;">'+GarmentMRP+'</td></tr><tr><td style="padding:2px;"><b>No of Washes</b></td><td style="padding:2px;">'+NoofWashes+'</td></tr><tr><td style="padding:2px;"><b>CCA Comments</b></td><td style="padding:2px;">'+UserComments+'</td></tr><tr><td style="padding:2px;"><b>Store Contact</b></td><td style="padding:2px;">'+StoreContact+'</td></tr><tr><td style="padding:2px;"><b>Store PhNo</b></td><td style="padding:2px;">'+StorePhNo+'</td></tr></table>'
     
      //var printReadyElem = document.getElementById(blockid);

      if (printReadyElem != null) html += printReadyElem;

      else {
  
        alert("Error, no contents.");
  
        return;
  
      }

      html += '\n</BO' + 'DY>\n</HT' + 'ML>';
  
      var printWin = window.open("", "SerialNoDetails");
  
      printWin.document.open();
  
      printWin.document.write(html);
  
      printWin.document.close();
      
      if (gAutoPrint){
        setTimeout(function(){  printWin.print(); }, 3000);     
      }
  
    } 
    else {
    alert("Browser not supported.");
    }
  
  }

  function qccprocessPrintDetails(blockid) {

    var StyleCode = document.getElementById("cStylecode").innerHTML == "undefined" ? "" : document.getElementById("cStylecode").innerHTML;
    var ReceiptDate = document.getElementById("cReceiptDate").innerHTML == "undefined" ? "" : document.getElementById("cReceiptDate").innerHTML;
    var From = document.getElementById("cfromtype").innerHTML == "undefined" ? "" : document.getElementById("cfromtype").innerHTML;
    var Sleeve = document.getElementById("cSleeve").innerHTML == "undefined" ? "" : document.getElementById("cSleeve").innerHTML;
    var SizeCode = document.getElementById("cSizeCode").innerHTML == "undefined" ? "" : document.getElementById("cSizeCode").innerHTML;
    //var GarmentColor = document.getElementById("cGarmentColor").innerHTML == "undefined" ? "" : document.getElementById("cGarmentColor").innerHTML; 
    var FabricCode = document.getElementById("cFabricCode").innerHTML == "undefined" ? "" : document.getElementById("cFabricCode").innerHTML; 
    var CustomerName = document.getElementById("cCustomerName").innerHTML == "undefined" ? "" : document.getElementById("cCustomerName").innerHTML;
    var CustomerAddress = document.getElementById("cCustomerAddress").innerHTML == "undefined" ? "" : document.getElementById("cCustomerAddress").innerHTML;
    var CustCity = document.getElementById("cCustCity").innerHTML == "undefined" ? "" : document.getElementById("cCustCity").innerHTML;
    var CustPin = document.getElementById("cCustPin").innerHTML == "undefined" ? "" : document.getElementById("cCustPin").innerHTML;
    var CustomerMobile = document.getElementById("cCustomerMobile").innerHTML == "undefined" ? "" : document.getElementById("cCustomerMobile").innerHTML;
    var CustomerEmail = document.getElementById("cCustomerEmail").innerHTML == "undefined" ? "" : document.getElementById("cCustomerEmail").innerHTML;
    var ReturnReason = document.getElementById("cReturnReason").innerHTML == "undefined" ? "" : document.getElementById("cReturnReason").innerHTML;
    var BillNo = document.getElementById("cBillNo").innerHTML == "undefined" ? "" : document.getElementById("cBillNo").innerHTML;
    var BillDate = document.getElementById("cBillDate").innerHTML == "undefined" ? "" : document.getElementById("cBillDate").innerHTML;
    var GarmentMRP = document.getElementById("cGarmentMRP").innerHTML == "undefined" ? "" : document.getElementById("cGarmentMRP").innerHTML;
    var NoofWashes = document.getElementById("cNoofWashes").innerHTML == "undefined" ? "" : document.getElementById("cNoofWashes").innerHTML;
    var UserComments = document.getElementById("cUserComments").innerHTML == "undefined" ? "" : document.getElementById("cUserComments").innerHTML;
    var StoreContact = document.getElementById("cStoreContact").innerHTML == "undefined" ? "" : document.getElementById("cStoreContact").innerHTML;
    var StorePhNo = document.getElementById("cStorePhNo").innerHTML == "undefined" ? "" : document.getElementById("cStorePhNo").innerHTML;
    var serialNo = document.getElementById("compdetails").innerHTML;
    var gAutoPrint = true;

    if (document.getElementById != null) {
  
      var html = '<HTML>\n<HEAD>\n';
  
      if (document.getElementsByTagName != null) {
  
        var headTags = document.getElementsByTagName("head");
  
        if (headTags.length > 0) html += headTags[0].innerHTML;
  
      }
  
      html += '\n</HE' + 'AD>\n<BODY>\n';
      
      var printReadyElem = '<h3 style="text-align:center">'+serialNo+'</h3><table style="margin-left:auto;margin-right:auto;" width="500" border="3"><tr><td style="padding:2px"><b>Style Code</b></td><td width="70%" style="padding:2px;">'+StyleCode+'</td></tr><tr><td style="padding:2px;"><b>Reciept Date</b></td><td style="padding:2px;">'+ReceiptDate+'</td></tr><tr><td style="padding:2px;"><b>From</b></td><td style="padding:2px;">'+From+'</td></tr><tr><td style="padding:2px;"><b>Sleeve</b></td><td style="padding:2px;">'+Sleeve+'</td></tr><tr><td style="padding:2px;"><b>Size Code</b></td><td style="padding:2px;">'+SizeCode+'</td></tr><tr><td style="padding:2px;"><b>Fabric Code</b></td><td style="padding:2px;">'+FabricCode+'</td></tr><tr><td style="padding:2px;"><b>Customer Name</b></td><td style="padding:2px;">'+CustomerName+'</td></tr><tr><td style="padding:2px;"><b>Customer Address</b></td><td style="padding:2px;">'+CustomerAddress+'</td></tr><tr><td style="padding:2px;"><b>City<b/></td><td style="padding:2px;">'+CustCity+'</td></tr><tr><td style="padding:2px;"><b>Pincode</b></td><td style="padding:2px;">'+CustPin+'</td></tr><tr><td style="padding:2px;"><b>Mobile</b></td><td style="padding:2px;">'+CustomerMobile+'</td></tr><tr><td style="padding:2px;"><b>Email</b></td><td style="padding:2px;">'+CustomerEmail+'</td></tr><tr><td style="padding:2px;"><b>Customer Comments</b></td><td style="padding:2px;">'+ReturnReason+'</td></tr><tr><td style="padding:2px;"><b>Bill No</b></td><td style="padding:2px;">'+BillNo+'</td></tr><tr><td style="padding:2px;"><b>Bill Date</b></td><td style="padding:2px;">'+BillDate+'</td></tr><tr><td style="padding:2px;"><b>Garment MRP</b></td><td style="padding:2px;">'+GarmentMRP+'</td></tr><tr><td style="padding:2px;"><b>No of Washes</b></td><td style="padding:2px;">'+NoofWashes+'</td></tr><tr><td style="padding:2px;"><b>CCA Comments</b></td><td style="padding:2px;">'+UserComments+'</td></tr><tr><td style="padding:2px;"><b>Store Contact</b></td><td style="padding:2px;">'+StoreContact+'</td></tr><tr><td style="padding:2px;"><b>Store PhNo</b></td><td style="padding:2px;">'+StorePhNo+'</td></tr></table>'
     
      //var printReadyElem = document.getElementById(blockid);

      if (printReadyElem != null) html += printReadyElem;

      
  
      /*else {
  
        alert("Error, no contents.");
  
        return;
  
      }*/

      html += '\n</BO' + 'DY>\n</HT' + 'ML>';
  
      var printWin = window.open("", "SerialNoDetails");
  
      printWin.document.open();
  
      printWin.document.write(html);
  
      printWin.document.close();
      
      if (gAutoPrint){
        setTimeout(function(){  printWin.print(); }, 3000);     
      }
  
    } 
    else {
    alert("Browser not supported.");
    }

  }

  function qcrprocessPrintDetails(blockid) {

    var StyleCode = document.getElementById("rStylecode").innerHTML == "undefined" ? "" : document.getElementById("rStylecode").innerHTML;
    var LRNo = document.getElementById("rLRNo").innerHTML == "undefined" ? "" : document.getElementById("rLRNo").innerHTML;
    var Sleeve = document.getElementById("rSleeve").innerHTML == "undefined" ? "" : document.getElementById("rSleeve").innerHTML;
    var SizeCode = document.getElementById("rSizeCode").innerHTML == "undefined" ? "" : document.getElementById("rSizeCode").innerHTML;
    var MfgMonth = document.getElementById("rMfgMonth").innerHTML == "undefined" ? "" : document.getElementById("rMfgMonth").innerHTML; 
    var MfgYear = document.getElementById("rMfgYear").innerHTML == "undefined" ? "" : document.getElementById("rMfgYear").innerHTML; 
    var ShroomNo = document.getElementById("rShroomNo").innerHTML == "undefined" ? "" : document.getElementById("rShroomNo").innerHTML;
    var ShroomName = document.getElementById("ShroomName").innerHTML == "undefined" ? "" : document.getElementById("ShroomName").innerHTML;
    var FabricCode = document.getElementById("rFabricCode").innerHTML == "undefined" ? "" : document.getElementById("rFabricCode").innerHTML;
    var ProdCategory = document.getElementById("rProdCategory").innerHTML == "undefined" ? "" : document.getElementById("rProdCategory").innerHTML;
    var VendorCode = document.getElementById("rVendorCode").innerHTML == "undefined" ? "" : document.getElementById("rVendorCode").innerHTML;
    var FactoryCode = document.getElementById("rFactoryCode").innerHTML == "undefined" ? "" : document.getElementById("rFactoryCode").innerHTML;
    var GarmentType = document.getElementById("rGarmentType").innerHTML == "undefined" ? "" : document.getElementById("rGarmentType").innerHTML;
    var GarmentCond = document.getElementById("rGarmentCond").innerHTML == "undefined" ? "" : document.getElementById("rGarmentCond").innerHTML;
    var GarmentSU = document.getElementById("rGarmentSU").innerHTML == "undefined" ? "" : document.getElementById("rGarmentSU").innerHTML;
    var ReturnType = document.getElementById("rReturnType").innerHTML == "undefined" ? "" : document.getElementById("rReturnType").innerHTML;
    var GarmentQuality = document.getElementById("rGarmentQuality").innerHTML == "undefined" ? "" : document.getElementById("rGarmentQuality").innerHTML;
    var ReturnJU = document.getElementById("rReturnJU").innerHTML == "undefined" ? "" : document.getElementById("rReturnJU").innerHTML;
    var DefectCode = document.getElementById("rDefectCode").innerHTML == "undefined" ? "" : document.getElementById("rDefectCode").innerHTML;
    var DefectType = document.getElementById("rDefectType").innerHTML == "undefined" ? "" : document.getElementById("rDefectType").innerHTML;
    var ComplaintRemarks = document.getElementById("rComplaintRemarks").innerHTML == "undefined" ? "" : document.getElementById("rComplaintRemarks").innerHTML;
    var serialNo = document.getElementById("compdetails").innerHTML;
    var gAutoPrint = true;

    if (document.getElementById != null) {
  
      var html = '<HTML>\n<HEAD>\n';
  
      if (document.getElementsByTagName != null) {
  
        var headTags = document.getElementsByTagName("head");
  
        if (headTags.length > 0) html += headTags[0].innerHTML;
  
      }
  
      html += '\n</HE' + 'AD>\n<BODY>\n';
      
      var printReadyElem = '<h3 style="text-align:center">'+serialNo+'</h3><table style="margin-left:auto;margin-right:auto;" width="500" border="3"><tr><td style="padding:2px"><b>Style Code</b></td><td width="70%" style="padding:2px;">'+StyleCode+'</td></tr><tr><td style="padding:2px;"><b>LR No</b></td><td style="padding:2px;">'+LRNo+'</td></tr><tr><td style="padding:2px;"><b>Sleeve</b></td><td style="padding:2px;">'+Sleeve+'</td></tr><tr><td style="padding:2px;"><b>Size</b></td><td style="padding:2px;">'+SizeCode+'</td></tr><tr><td style="padding:2px;"><b>Mfg Month</b></td><td style="padding:2px;">'+MfgMonth+'</td></tr><tr><td style="padding:2px;"><b>Mfg Year</b></td><td style="padding:2px;">'+MfgYear+'</td></tr><tr><td style="padding:2px;"><b>Shroom No</b></td><td style="padding:2px;">'+ShroomNo+'</td></tr><tr><td style="padding:2px;"><b>Shroom Name</b></td><td style="padding:2px;">'+ShroomName+'</td></tr><tr><td style="padding:2px;"><b>Fabric Code</b></td><td style="padding:2px;">'+FabricCode+'</td></tr><tr><td style="padding:2px;"><b>Prod Category<b/></td><td style="padding:2px;">'+ProdCategory+'</td></tr><tr><td style="padding:2px;"><b>Vendor Code</b></td><td style="padding:2px;">'+VendorCode+'</td></tr><tr><td style="padding:2px;"><b>Factory Code</b></td><td style="padding:2px;">'+FactoryCode+'</td></tr><tr><td style="padding:2px;"><b>Garment Type</b></td><td style="padding:2px;">'+GarmentType+'</td></tr><tr><td style="padding:2px;"><b>Garment Cond</b></td><td style="padding:2px;">'+GarmentCond+'</td></tr><tr><td style="padding:2px;"><b>Garment SU</b></td><td style="padding:2px;">'+GarmentSU+'</td></tr><tr><td style="padding:2px;"><b>Return Type</b></td><td style="padding:2px;">'+ReturnType+'</td></tr><tr><td style="padding:2px;"><b>Garment Quality</b></td><td style="padding:2px;">'+GarmentQuality+'</td></tr><tr><td style="padding:2px;"><b>Return JU</b></td><td style="padding:2px;">'+ReturnJU+'</td></tr><tr><td style="padding:2px;"><b>Defect Code</b></td><td style="padding:2px;">'+DefectCode+'</td></tr><tr><td style="padding:2px;"><b>Defect Type</b></td><td style="padding:2px;">'+DefectType+'</td></tr><tr><td style="padding:2px;"><b>Complaint Remarks</b></td><td style="padding:2px;">'+ComplaintRemarks+'</td></tr></table>'
     
      //var printReadyElem = document.getElementById(blockid);

      if (printReadyElem != null) html += printReadyElem;

      /*else {
  
        alert("Error, no contents.");
  
        return;
  
      }*/

      html += '\n</BO' + 'DY>\n</HT' + 'ML>';
  
      var printWin = window.open("", "SerialNoDetails");
  
      printWin.document.open();
  
      printWin.document.write(html);
  
      printWin.document.close();
      
      if (gAutoPrint){
        setTimeout(function(){  printWin.print(); }, 3000);     
      }
  
    } 
    else {
    alert("Browser not supported.");
    }
  
  }

  function ggvprocessPrintDetails(blockid) {

    var StyleCode = document.getElementById("cStylecode").innerHTML == "undefined" ? "" : document.getElementById("cStylecode").innerHTML;
    var ReceiptDate = document.getElementById("cReceiptDate").innerHTML == "undefined" ? "" : document.getElementById("cReceiptDate").innerHTML;
    var From = document.getElementById("cfromtype").innerHTML == "undefined" ? "" : document.getElementById("cfromtype").innerHTML;
    var Sleeve = document.getElementById("cSleeve").innerHTML == "undefined" ? "" : document.getElementById("cSleeve").innerHTML;
    var SizeCode = document.getElementById("cSizeCode").innerHTML == "undefined" ? "" : document.getElementById("cSizeCode").innerHTML; 
    var StorePhNo = document.getElementById("cStorePhNo").innerHTML == "undefined" ? "" : document.getElementById("cStorePhNo").innerHTML;
    var FabricCode = document.getElementById("cFabricCode").innerHTML == "undefined" ? "" : document.getElementById("cFabricCode").innerHTML; 
    var CustomerName = document.getElementById("cCustomerName").innerHTML == "undefined" ? "" : document.getElementById("cCustomerName").innerHTML;
    var CustomerAddress = document.getElementById("cCustomerAddress").innerHTML == "undefined" ? "" : document.getElementById("cCustomerAddress").innerHTML;
    var CustCity = document.getElementById("cCustCity").innerHTML == "undefined" ? "" : document.getElementById("cCustCity").innerHTML;
    var CustPin = document.getElementById("cCustPin").innerHTML == "undefined" ? "" : document.getElementById("cCustPin").innerHTML;
    var CustomerMobile = document.getElementById("cCustomerMobile").innerHTML == "undefined" ? "" : document.getElementById("cCustomerMobile").innerHTML;
    var CustomerEmail = document.getElementById("cCustomerEmail").innerHTML == "undefined" ? "" : document.getElementById("cCustomerEmail").innerHTML;
    var ReturnReason = document.getElementById("cReturnReason").innerHTML == "undefined" ? "" : document.getElementById("cReturnReason").innerHTML;
    var BillNo = document.getElementById("cBillNo").innerHTML == "undefined" ? "" : document.getElementById("cBillNo").innerHTML;
    var BillDate = document.getElementById("cBillDate").innerHTML == "undefined" ? "" : document.getElementById("cBillDate").innerHTML;
    var GarmentMRP = document.getElementById("cGarmentMRP").innerHTML == "undefined" ? "" : document.getElementById("cGarmentMRP").innerHTML;
    var NoofWashes = document.getElementById("cNoofWashes").innerHTML == "undefined" ? "" : document.getElementById("cNoofWashes").innerHTML;
    var UserComments = document.getElementById("cUserComments").innerHTML == "undefined" ? "" : document.getElementById("cUserComments").innerHTML;
    var StoreContact = document.getElementById("cStoreContact").innerHTML == "undefined" ? "" : document.getElementById("cStoreContact").innerHTML;
    var serialNo = document.getElementById("compdetails").innerHTML == "undefined" ? "" : document.getElementById("compdetails").innerHTML;
    var gAutoPrint = true;

    if (document.getElementById != null) {
  
      var html = '<HTML>\n<HEAD>\n';
  
      if (document.getElementsByTagName != null) {
  
        var headTags = document.getElementsByTagName("head");
  
        if (headTags.length > 0) html += headTags[0].innerHTML;
  
      }
  
      html += '\n</HE' + 'AD>\n<BODY>\n';
      
      var printReadyElem = '<h3 style="text-align:center">'+serialNo+'</h3><table style="margin-left:auto;margin-right:auto;" width="500" border="3"><tr><td style="padding:2px"><b>Style Code</b></td><td width="70%" style="padding:2px;">'+StyleCode+'</td></tr><tr><td style="padding:2px;"><b>Reciept Date</b></td><td style="padding:2px;">'+ReceiptDate+'</td></tr><tr><td style="padding:2px;"><b>From</b></td><td style="padding:2px;">'+From+'</td></tr><tr><td style="padding:2px;"><b>Sleeve</b></td><td style="padding:2px;">'+Sleeve+'</td></tr><tr><td style="padding:2px;"><b>Size Code</b></td><td style="padding:2px;">'+SizeCode+'</td></tr><tr><td style="padding:2px;"><b>Store PhNo</b></td><td style="padding:2px;">'+StorePhNo+'</td></tr><tr><td style="padding:2px;"><b>Fabric Code</b></td><td style="padding:2px;">'+FabricCode+'</td></tr><tr><td style="padding:2px;"><b>Customer Name</b></td><td style="padding:2px;">'+CustomerName+'</td></tr><tr><td style="padding:2px;"><b>Customer Address</b></td><td style="padding:2px;">'+CustomerAddress+'</td></tr><tr><td style="padding:2px;"><b>City<b/></td><td style="padding:2px;">'+CustCity+'</td></tr><tr><td style="padding:2px;"><b>Pincode</b></td><td style="padding:2px;">'+CustPin+'</td></tr><tr><td style="padding:2px;"><b>Mobile</b></td><td style="padding:2px;">'+CustomerMobile+'</td></tr><tr><td style="padding:2px;"><b>Email</b></td><td style="padding:2px;">'+CustomerEmail+'</td></tr><tr><td style="padding:2px;"><b>Customer Comments</b></td><td style="padding:2px;">'+ReturnReason+'</td></tr><tr><td style="padding:2px;"><b>Bill No</b></td><td style="padding:2px;">'+BillNo+'</td></tr><tr><td style="padding:2px;"><b>Bill Date</b></td><td style="padding:2px;">'+BillDate+'</td></tr><tr><td style="padding:2px;"><b>Garment MRP</b></td><td style="padding:2px;">'+GarmentMRP+'</td></tr><tr><td style="padding:2px;"><b>No of Washes</b></td><td style="padding:2px;">'+NoofWashes+'</td></tr><tr><td style="padding:2px;"><b>CCA Comments</b></td><td style="padding:2px;">'+UserComments+'</td></tr><tr><td style="padding:2px;"><b>Store Contact</b></td><td style="padding:2px;">'+StoreContact+'</td></tr></table>'
     
      //var printReadyElem = document.getElementById(blockid);

      if (printReadyElem != null) html += printReadyElem;

      else {
  
        alert("Error, no contents.");
  
        return;
  
      }

      html += '\n</BO' + 'DY>\n</HT' + 'ML>';
  
      var printWin = window.open("", "SerialNoDetails");
  
      printWin.document.open();
  
      printWin.document.write(html);
  
      printWin.document.close();
      
      if (gAutoPrint){
        setTimeout(function(){  printWin.print(); }, 3000);     
      }
  
    } 
    else {
    alert("Browser not supported.");
    }
  
  }

  function retailprocessPrintDetails(blockid) {

    var StyleCode = document.getElementById("cStylecode").innerHTML == "undefined" ? "" : document.getElementById("cStylecode").innerHTML;
    var ReceiptDate = document.getElementById("cReceiptDate").innerHTML == "undefined" ? "" : document.getElementById("cReceiptDate").innerHTML;
    var From = document.getElementById("cfromtype").innerHTML == "undefined" ? "" : document.getElementById("cfromtype").innerHTML;
    var Sleeve = document.getElementById("cSleeve").innerHTML == "undefined" ? "" : document.getElementById("cSleeve").innerHTML;
    var SizeCode = document.getElementById("cSizeCode").innerHTML == "undefined" ? "" : document.getElementById("cSizeCode").innerHTML; 
    var StorePhNo = document.getElementById("cStorePhNo").innerHTML == "undefined" ? "" : document.getElementById("cStorePhNo").innerHTML;
    var FabricCode = document.getElementById("cFabricCode").innerHTML == "undefined" ? "" : document.getElementById("cFabricCode").innerHTML; 
    var CustomerName = document.getElementById("cCustomerName").innerHTML == "undefined" ? "" : document.getElementById("cCustomerName").innerHTML;
    var CustomerAddress = document.getElementById("cCustomerAddress").innerHTML == "undefined" ? "" : document.getElementById("cCustomerAddress").innerHTML;
    var CustCity = document.getElementById("cCustCity").innerHTML == "undefined" ? "" : document.getElementById("cCustCity").innerHTML;
    var CustPin = document.getElementById("cCustPin").innerHTML == "undefined" ? "" : document.getElementById("cCustPin").innerHTML;
    var CustomerMobile = document.getElementById("cCustomerMobile").innerHTML == "undefined" ? "" : document.getElementById("cCustomerMobile").innerHTML;
    var CustomerEmail = document.getElementById("cCustomerEmail").innerHTML == "undefined" ? "" : document.getElementById("cCustomerEmail").innerHTML;
    var ReturnReason = document.getElementById("cReturnReason").innerHTML == "undefined" ? "" : document.getElementById("cReturnReason").innerHTML;
    var BillNo = document.getElementById("cBillNo").innerHTML == "undefined" ? "" : document.getElementById("cBillNo").innerHTML;
    var BillDate = document.getElementById("cBillDate").innerHTML == "undefined" ? "" : document.getElementById("cBillDate").innerHTML;
    var GarmentMRP = document.getElementById("cGarmentMRP").innerHTML == "undefined" ? "" : document.getElementById("cGarmentMRP").innerHTML;
    var NoofWashes = document.getElementById("cNoofWashes").innerHTML == "undefined" ? "" : document.getElementById("cNoofWashes").innerHTML;
    var UserComments = document.getElementById("cUserComments").innerHTML == "undefined" ? "" : document.getElementById("cUserComments").innerHTML;
    var StoreContact = document.getElementById("cStoreContact").innerHTML == "undefined" ? "" : document.getElementById("cStoreContact").innerHTML;
    var serialNo = document.getElementById("compdetails").innerHTML == "undefined" ? "" : document.getElementById("compdetails").innerHTML;
    var gAutoPrint = true;

    if (document.getElementById != null) {
  
      var html = '<HTML>\n<HEAD>\n';
  
      if (document.getElementsByTagName != null) {
  
        var headTags = document.getElementsByTagName("head");
  
        if (headTags.length > 0) html += headTags[0].innerHTML;
  
      }
  
      html += '\n</HE' + 'AD>\n<BODY>\n';
      
      var printReadyElem = '<h3 style="text-align:center">'+serialNo+'</h3><table style="margin-left:auto;margin-right:auto;" width="500" border="3"><tr><td style="padding:2px"><b>Style Code</b></td><td width="70%" style="padding:2px;">'+StyleCode+'</td></tr><tr><td style="padding:2px;"><b>Reciept Date</b></td><td style="padding:2px;">'+ReceiptDate+'</td></tr><tr><td style="padding:2px;"><b>From</b></td><td style="padding:2px;">'+From+'</td></tr><tr><td style="padding:2px;"><b>Sleeve</b></td><td style="padding:2px;">'+Sleeve+'</td></tr><tr><td style="padding:2px;"><b>Size Code</b></td><td style="padding:2px;">'+SizeCode+'</td></tr><tr><td style="padding:2px;"><b>Store PhNo</b></td><td style="padding:2px;">'+StorePhNo+'</td></tr><tr><td style="padding:2px;"><b>Fabric Code</b></td><td style="padding:2px;">'+FabricCode+'</td></tr><tr><td style="padding:2px;"><b>Customer Name</b></td><td style="padding:2px;">'+CustomerName+'</td></tr><tr><td style="padding:2px;"><b>Customer Address</b></td><td style="padding:2px;">'+CustomerAddress+'</td></tr><tr><td style="padding:2px;"><b>City<b/></td><td style="padding:2px;">'+CustCity+'</td></tr><tr><td style="padding:2px;"><b>Pincode</b></td><td style="padding:2px;">'+CustPin+'</td></tr><tr><td style="padding:2px;"><b>Mobile</b></td><td style="padding:2px;">'+CustomerMobile+'</td></tr><tr><td style="padding:2px;"><b>Email</b></td><td style="padding:2px;">'+CustomerEmail+'</td></tr><tr><td style="padding:2px;"><b>Customer Comments</b></td><td style="padding:2px;">'+ReturnReason+'</td></tr><tr><td style="padding:2px;"><b>Bill No</b></td><td style="padding:2px;">'+BillNo+'</td></tr><tr><td style="padding:2px;"><b>Bill Date</b></td><td style="padding:2px;">'+BillDate+'</td></tr><tr><td style="padding:2px;"><b>Garment MRP</b></td><td style="padding:2px;">'+GarmentMRP+'</td></tr><tr><td style="padding:2px;"><b>No of Washes</b></td><td style="padding:2px;">'+NoofWashes+'</td></tr><tr><td style="padding:2px;"><b>CCA Comments</b></td><td style="padding:2px;">'+UserComments+'</td></tr><tr><td style="padding:2px;"><b>Store Contact</b></td><td style="padding:2px;">'+StoreContact+'</td></tr></table>'
     
      //var printReadyElem = document.getElementById(blockid);

      if (printReadyElem != null) html += printReadyElem;

      else {
  
        alert("Error, no contents.");
  
        return;
  
      }

      html += '\n</BO' + 'DY>\n</HT' + 'ML>';
  
      var printWin = window.open("", "SerialNoDetails");
  
      printWin.document.open();
  
      printWin.document.write(html);
  
      printWin.document.close();
      
      if (gAutoPrint){
        setTimeout(function(){  printWin.print(); }, 3000);     
      }
  
    } 
    else {
    alert("Browser not supported.");
    }
  
  }

  function viewDetailsPrint(blockid) {

    var Store = document.getElementById("Store").innerHTML == "undefined" ? "" : document.getElementById("Store").innerHTML;
    var StoreName = document.getElementById("StoreName").innerHTML == "undefined" ? "" : document.getElementById("StoreName").innerHTML
    var SerialNo = document.getElementById("SerialNo").innerHTML == "undefined" ? "" : document.getElementById("SerialNo").innerHTML;
    var InwardDate = document.getElementById("InwardDate").innerHTML == "undefined" ? "" : document.getElementById("InwardDate").innerHTML;
    var QCAnalysisDate = document.getElementById("QCAnalysisDate").innerHTML == "undefined" ? "" : document.getElementById("QCAnalysisDate").innerHTML;
    var Style = document.getElementById("Style").innerHTML == "undefined" ? "" : document.getElementById("Style").innerHTML; 
    var Sleeve = document.getElementById("Sleeve").innerHTML == "undefined" ? "" : document.getElementById("Sleeve").innerHTML;
    var Size = document.getElementById("Size").innerHTML == "undefined" ? "" : document.getElementById("Size").innerHTML; 
    var Origin = document.getElementById("Origin").innerHTML == "undefined" ? "" : document.getElementById("Origin").innerHTML;
    var Fabric = document.getElementById("Fabric").innerHTML == "undefined" ? "" : document.getElementById("Fabric").innerHTML;
    var MfgMonth = document.getElementById("MfgMonth").innerHTML == "undefined" ? "" : document.getElementById("MfgMonth").innerHTML;
    var MfgYear = document.getElementById("MfgYear").innerHTML == "undefined" ? "" : document.getElementById("MfgYear").innerHTML;
    var Justification = document.getElementById("Justification").innerHTML == "undefined" ? "" : document.getElementById("Justification").innerHTML;
    var Defect = document.getElementById("Defect").innerHTML == "undefined" ? "" : document.getElementById("Defect").innerHTML;
    var DefectAnalysis = document.getElementById("DefectAnalysis").innerHTML == "undefined" ? "" : document.getElementById("DefectAnalysis").innerHTML;
    var VendorCode = document.getElementById("Vendor").innerHTML == "undefined" ? "" : document.getElementById("Vendor").innerHTML;
    var VendorName = document.getElementById("VendorName").innerHTML == "undefined" ? "" : document.getElementById("VendorName").innerHTML;
    var FactoryCode = document.getElementById("Factory").innerHTML == "undefined" ? "" : document.getElementById("Factory").innerHTML;
    var FactoryName = document.getElementById("FactoryName").innerHTML == "undefined" ? "" : document.getElementById("FactoryName").innerHTML;
    var GarmentType = document.getElementById("GarmentType").innerHTML == "undefined" ? "" : document.getElementById("GarmentType").innerHTML;
    var GarmentCodition = document.getElementById("GarmentCondition").innerHTML == "undefined" ? "" : document.getElementById("GarmentCondition").innerHTML;
    var Saleable_Unsaleable = document.getElementById("SaleableUnSaleable").innerHTML == "undefined" ? "" : document.getElementById("SaleableUnSaleable").innerHTML;
    var GarmentQuality = document.getElementById("GarmentQuality").innerHTML == "undefined" ? "" : document.getElementById("GarmentQuality").innerHTML;
    var MRP = document.getElementById("MRP").innerHTML == "undefined" ? "" : document.getElementById("MRP").innerHTML;
    var CloseDate = document.getElementById("CloseDate").innerHTML == "undefined" ? "" : document.getElementById("CloseDate").innerHTML;
    var ActionTaken = document.getElementById("ActionTaken").innerHTML == "undefined" ? "" : document.getElementById("ActionTaken").innerHTML;
    var viewDetails = document.getElementById("viewDetails").innerHTML == "undefined" ? "" : document.getElementById("viewDetails").innerHTML;
    var gAutoPrint = true;

    if (document.getElementById != null) {
  
      var html = '<HTML>\n<HEAD>\n';
  
      if (document.getElementsByTagName != null) {
  
        var headTags = document.getElementsByTagName("head");
  
        if (headTags.length > 0) html += headTags[0].innerHTML;
  
      }
  
      html += '\n</HE' + 'AD>\n<BODY>\n';
      
      var printReadyElem = '<h3 style="text-align:center">'+viewDetails+'</h3><table style="margin-left:auto;margin-right:auto;" width="500" border="3"><tr><td style="padding:2px;"><b>Store</b></td><td width="70%" style="padding:2px;">'+Store+'</td></tr><tr><td style="padding:2px;"><b>Store Name</b></td><td width="70%" style="padding:2px;">'+StoreName+'</td></tr><tr><td style="padding:2px;"><b>Serial No</b></td><td style="padding:2px;">'+SerialNo+'</td></tr><tr><td style="padding:2px;"><b>Inward Date</b></td><td style="padding:2px;">'+InwardDate+'</td></tr><tr><td style="padding:2px;"><b>QC Analysis Date</b></td><td style="padding:2px;">'+QCAnalysisDate+'</td></tr><tr><td style="padding:2px;"><b>Style</b></td><td style="padding:2px;">'+Style+'</td></tr><tr><td style="padding:2px;"><b>Sleeve</b></td><td style="padding:2px;">'+Sleeve+'</td></tr><tr><td style="padding:2px;"><b>Size</b></td><td style="padding:2px;">'+Size+'</td></tr><tr><td style="padding:2px;"><b>Origin</b></td><td style="padding:2px;">'+Origin+'</td></tr><tr><td style="padding:2px;"><b>Fabric</b></td><td style="padding:2px;">'+Fabric+'</td></tr><tr><td style="padding:2px;"><b>Mfg Month<b/></td><td style="padding:2px;">'+MfgMonth+'</td></tr><tr><td style="padding:2px;"><b>Mfg Year<b/></td><td style="padding:2px;">'+MfgYear+'</td></tr><tr><td style="padding:2px;"><b>Justification</b></td><td style="padding:2px;">'+Justification+'</td></tr><tr><td style="padding:2px;"><b>Defect</b></td><td style="padding:2px;">'+Defect+'</td></tr><tr><td style="padding:2px;"><b>Defect Analysis</b></td><td style="padding:2px;">'+DefectAnalysis+'</td></tr><tr><td style="padding:2px;"><b>Vendor Code</b></td><td style="padding:2px;">'+VendorCode+'</td></tr><tr><td style="padding:2px;"><b>Vendor Name</b></td><td style="padding:2px;">'+VendorName+'</td></tr><tr><td style="padding:2px;"><b>Factory Code</b></td><td style="padding:2px;">'+FactoryCode+'</td></tr><tr><td style="padding:2px;"><b>Factory Name</b></td><td style="padding:2px;">'+FactoryName+'</td></tr><tr><td style="padding:2px;"><b>Garment Type</b></td><td style="padding:2px;">'+GarmentType+'</td></tr><tr><td style="padding:2px;"><b>Garment Codition</b></td><td style="padding:2px;">'+GarmentCodition+'</td></tr><tr><td style="padding:2px;"><b>Saleable_Unsaleable</b></td><td style="padding:2px;">'+Saleable_Unsaleable+'</td></tr><tr><td style="padding:2px;"><b>Garment Quality</b></td><td style="padding:2px;">'+GarmentQuality+'</td></tr><tr><td style="padding:2px;"><b>MRP</b></td><td style="padding:2px;">'+MRP+'</td></tr><tr><td style="padding:2px;"><b>Close Date</b></td><td style="padding:2px;">'+CloseDate+'</td></tr><tr><td style="padding:2px;"><b>Action Taken</b></td><td style="padding:2px;">'+ActionTaken+'</td></tr></table>'
     
      //var printReadyElem = document.getElementById(blockid);

      if (printReadyElem != null) html += printReadyElem;

      else {
  
        alert("Error, no contents.");
  
        return;
  
      }

      html += '\n</BO' + 'DY>\n</HT' + 'ML>';
  
      var printWin = window.open("", "SerialNoDetails");
  
      printWin.document.open();
  
      printWin.document.write(html);
  
      printWin.document.close();
      
      if (gAutoPrint){
        setTimeout(function(){  printWin.print(); }, 3000);     
      }
  
    } 
    else {
    alert("Browser not supported.");
    }
  
  }

  function bulkViewDetailsPrint(blockid) {
    var ComplaintID = document.getElementById("ujComplaintID").value == "undefined" ? "" : document.getElementById("ujComplaintID").value;
    var QCAnalysisDate = document.getElementById("ujQCAnalysisDate").value == "undefined" ? "" : document.getElementById("ujQCAnalysisDate").value;
    var CustomerName = document.getElementById("ujCustomerName").value == "undefined" ? "" : document.getElementById("ujCustomerName").value;
    var Store = document.getElementById("ujStore").value == "undefined" ? "" : document.getElementById("ujStore").value;
    var StoreName = document.getElementById("ujStoreName").value == "undefined" ? "" : document.getElementById("ujStoreName").value;
    var CustomerMobile = document.getElementById("ujCustomerMobile").value == "undefined" ? "" : document.getElementById("ujCustomerMobile").value; 
    var Brand = document.getElementById("ujBrand").value == "undefined" ? "" : document.getElementById("ujBrand").value;
    var CustomerAddress = document.getElementById("ujCustomerAddress").value == "undefined" ? "" : document.getElementById("ujCustomerAddress").value; 
    var ReceiptDate = document.getElementById("ujReceiptDate").value == "undefined" ? "" : document.getElementById("ujReceiptDate").value;
    var CustCity = document.getElementById("ujCustCity").value == "undefined" ? "" : document.getElementById("ujCustCity").value;
    var CustPin = document.getElementById("ujCustPin").value == "undefined" ? "" : document.getElementById("ujCustPin").value;
    var GarmentType = document.getElementById("ujGarmentType").value == "undefined" ? "" : document.getElementById("ujGarmentType").value;
    var Style = document.getElementById("ujStyle").value == "undefined" ? "" : document.getElementById("ujStyle").value;
    var Fabric = document.getElementById("ujFabric").value == "undefined" ? "" : document.getElementById("ujFabric").value;
    var Size = document.getElementById("ujSize").value == "undefined" ? "" : document.getElementById("ujSize").value;
    var GarmentCondition = document.getElementById("ujGarmentCondition").value == "undefined" ? "" : document.getElementById("ujGarmentCondition").value;
    var UserComments = document.getElementById("ujUserComments").value == "undefined" ? "" : document.getElementById("ujUserComments").value;
    var para = document.getElementById("ujpara").innerHTML == "undefined" ? "" : document.getElementById("ujpara").innerHTML;
    var analysis = document.getElementById("ujanalysis").innerHTML == "undefined" ? "" : document.getElementById("ujanalysis").innerHTML;
    /*var FactoryName = document.getElementById("FactoryName").innerHTML == "undefined" ? "" : document.getElementById("FactoryName").innerHTML;
    var GarmentType = document.getElementById("GarmentType").innerHTML == "undefined" ? "" : document.getElementById("GarmentType").innerHTML;
    var GarmentCodition = document.getElementById("GarmentCondition").innerHTML == "undefined" ? "" : document.getElementById("GarmentCondition").innerHTML;
    var Saleable_Unsaleable = document.getElementById("SaleableUnSaleable").innerHTML == "undefined" ? "" : document.getElementById("SaleableUnSaleable").innerHTML;
    var GarmentQuality = document.getElementById("GarmentQuality").innerHTML == "undefined" ? "" : document.getElementById("GarmentQuality").innerHTML;
    var MRP = document.getElementById("MRP").innerHTML == "undefined" ? "" : document.getElementById("MRP").innerHTML;
    var CloseDate = document.getElementById("CloseDate").innerHTML == "undefined" ? "" : document.getElementById("CloseDate").innerHTML;
    var ActionTaken = document.getElementById("ActionTaken").innerHTML == "undefined" ? "" : document.getElementById("ActionTaken").innerHTML;*/
    var viewDetails = document.getElementById("ujviewDetails").innerHTML == "undefined" ? "" : document.getElementById("ujviewDetails").innerHTML;
    var gAutoPrint = true;

    if (document.getElementById != null) {
  
      var html = '<HTML>\n<HEAD>\n';
  
      if (document.getElementsByTagName != null) {
  
        var headTags = document.getElementsByTagName("head");
  
        if (headTags.length > 0) html += headTags[0].innerHTML;
  
      }
  
      html += '\n</HE' + 'AD>\n<BODY>\n';
      
      var printReadyElem = '<h3 style="margin-left:50px;font-family: calibri light;font-size:20px;">'+viewDetails+'</h3><table style="margin-left:150px;font-family: calibri light;font-size:20px;" width="500" border="3"><tr><td style="padding:2px;"><b>Complaint ID</b></td><td width="70%" style="padding:2px;">'+ComplaintID+'</td></tr><tr><td style="padding:2px;"><b>Analysis Date</b></td><td width="70%" style="padding:2px;">'+QCAnalysisDate+'</td></tr><tr><td style="padding:2px;"><b>Customer Name</b></td><td style="padding:2px;">'+CustomerName+'</td></tr><tr><td style="padding:2px;"><b>Store Name</b></td><td style="padding:2px;">'+Store+'</td></tr><tr><td style="padding:2px;"><b>Store Name</b></td><td style="padding:2px;">'+StoreName+'</td></tr><tr><td style="padding:2px;"><b>Customer Mobile</b></td><td style="padding:2px;">'+CustomerMobile+'</td></tr><tr><td style="padding:2px;"><b>Brand</b></td><td style="padding:2px;">'+Brand+'</td></tr><tr><td style="padding:2px;"><b>CustomerAddress</b></td><td style="padding:2px;">'+CustomerAddress+'</td></tr><tr><td style="padding:2px;"><b>ReceiptDate</b></td><td style="padding:2px;">'+ReceiptDate+'</td></tr><tr><td style="padding:2px;"><b>City</b></td><td style="padding:2px;">'+CustCity+'</td></tr><tr><td style="padding:2px;"><b>Pincode<b/></td><td style="padding:2px;">'+CustPin+'</td></tr><tr><td style="padding:2px;"><b>GarmentType<b/></td><td style="padding:2px;">'+GarmentType+'</td></tr><tr><td style="padding:2px;"><b>Style</b></td><td style="padding:2px;">'+Style+'</td></tr><tr><td style="padding:2px;"><b>Fabric</b></td><td style="padding:2px;">'+Fabric+'</td></tr><tr><td style="padding:2px;"><b>Size</b></td><td style="padding:2px;">'+Size+'</td></tr><tr><td style="padding:2px;"><b>GarmentCondition</b></td><td style="padding:2px;">'+GarmentCondition+'</td></tr><tr><td style="padding:2px;"><b>UserComments</b></td><td style="padding:2px;">'+UserComments+'</td></tr></table><h4 style="padding:2px;margin-left: 50px;font-family: calibri light;font-size: 20px;">'+analysis+'</h4><div style="padding:2px;margin-left: 50px;font-family: calibri light;font-size: 20px;">'+para+'</div>'
     
      //var printReadyElem = document.getElementById(blockid);

      if (printReadyElem != null) html += printReadyElem;

      else {
  
        alert("Error, no contents.");
  
        return;
  
      }

      html += '\n</BO' + 'DY>\n</HT' + 'ML>';
  
      var printWin = window.open("", "SerialNoDetails");
  
      printWin.document.open();
  
      printWin.document.write(html);
  
      printWin.document.close();
      
      if (gAutoPrint){
        setTimeout(function(){  printWin.print(); }, 3000);     
      }
  
    } 
    else {
    alert("Browser not supported.");
    }
  
  }
  