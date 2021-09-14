const moment = require('moment');

export const invoiceTemplate = (invoiceData: any) => {

    let invoiceItems = ''
    for (let index = 0; index < invoiceData.items.length; index++) {
        invoiceItems += `  <tr>
        <th style="text-align: left; width:5%">${invoiceData.items[index].serial_number}</th>
        <th style="text-align: left; width: 70%">${invoiceData.items[index].name} ${invoiceData.items[index].description}</th>
        <th style="text-align: left; width: 10%">${invoiceData.items[index].unit_amount}</th>
        <th style="text-align: left; width: 5%">${invoiceData.items[index].quantity}}</th>
        <th style="text-align: left; width: 10%">${invoiceData.items[index].total_amount}</th>
      </tr>`
    }

  return `<!DOCTYPE html>
  <html>
  <head>
  <style>
  table, td, th {
    border: 1px solid black;
    font-size:14px;
    color:#000;
    font-weight:400;
    padding:7px;
    font-family:sans-serif;
  }
  
  table {
    width: 100%;
     border-collapse: collapse;
  }
  h3{
    font-family:sans-serif;
    font-size:18px;
    color:#000;
    line-height: 0px;
    padding:5px 0px;
  }
  p{
    font-family:sans-serif;
    font-size:15px;
    color:#000;
    line-height:10px;
  }
  </style>
  </head>
  <body>
  
  
  <h2>SHIPPING LABEL</h2>
  
  <table>
    <tr>
      <th style="text-align: left;" colspan="1">Invoice ID: ${invoiceData.invoice_number}</th>
      <th style="text-align: right;" colspan="5">Purchase ID: ${invoiceData.order_uc_id}</th>
    </tr>
    <tr>
      <td width="40%" colspan="1">Courier: ${invoiceData.courier_code}</td>
      <td rowspan="2" colspan="5">AWB#:${invoiceData.awb_number}<br /><img src=${invoiceData.bar_code_path} alt="" /></td>
    </tr>
    <tr>
      <td>PACKAGING DATE: ${invoiceData.invoice_date}</td>
    </tr>
    <tr>
      <th style="text-align: left; font-size:24px" colspan="1">SHIPPING TO</th>
      <th style="text-align: left; font-size:24px" colspan="5">THROUGH</th>
    </tr>
    <tr>
      <th style="text-align: left;"  colspan="1">${invoiceData.consignee_name}<br/>${invoiceData.address}<br/>${invoiceData.city}<br/>${invoiceData.state_country}<br/>${invoiceData.phone}<br/>Pin: ${invoiceData.delivery_pin}</th>
      <th style="text-align: left;" colspan="5">${invoiceData.courier_name} ${invoiceData.process_code}</th>
    </tr>
    <tr>
      <th style="text-align: left; font-size:24px" colspan="6">PRODUCTS</th>
    </tr>
    <table width="100%" style="border:none;border-collapse: collapse;">
  
      <tr>
        <th style="text-align: left; width:5%">SN</th>
        <th style="text-align: left; width: 10%">Order ID</th>
        <th style="text-align: left; width: 60%">Description of Goods/services</th>
  <!--      <th style="text-align: left; width: 10%">HSN Code</th>-->
        <th style="text-align: left; width: 5%">Qty</th>
        <th style="text-align: left; width: 10%">Payment Mode</th>
        <th style="text-align: left; width: 10%">Total Amount</th>
      </tr>
    ${invoiceItems}
    </table>
  
     <table width="100%" style="border:none;border-collapse: collapse;">
    <tr>
      <th style="text-align: right; font-size:24px; font-weight: bold" colspan="6">${invoiceData.bill_amount}</th>
    </tr>
    <tr>
      <th style="text-align: left; font-size:24px" colspan="6">TOTAL QUANTITY : ${invoiceData.total_quantity}</th>
    </tr>
    <tr>
      <th style="text-align: left;"  colspan="1">DECLARATION<br/>1) The goods shipped here are intended for end user consumption and not resale</th>
      <th style="text-align: left;" colspan="5">Sold by: <br/> ${invoiceData.supplier_city} <br />${invoiceData.supplier_state},${invoiceData.supplier_pin_code}</th>
    </tr>
  </table>
  </table>
  
  
  <p style="page-break-before: always" ></p>
  
  
  <h3 align="right">Bill of Supply/Cash Memo</h3>
  <p align="right">Invoice Number: ${invoiceData.invoice_number} </p>
  <p align="right">Invoice Date: ${invoiceData.invoice_date}</p>
  <table>
  
    <tr>
      <th style="text-align: left; font-size:24px">BILL TO:</th>
      <th style="text-align: left; font-size:24px">SOLD BY:</th>
      <th style="text-align: left; font-size:24px">SHIPPED FROM:</th>
    </tr>
    <tr>
      <th style="text-align: left;">${invoiceData.consignee_name}<br/>${invoiceData.address}<br/>${invoiceData.city}<br/>${invoiceData.state_country}<br/>Pin: ${invoiceData.delivery_pin}</th>
      <th style="text-align: left;">${invoiceData.reseller_first_name} ${invoiceData.reseller_last_name}</th>
      <th style="text-align: left;">${invoiceData.supplier_city} <br />${invoiceData.supplier_state}, ${invoiceData.supplier_pin_code}</th>
    </tr>
    <tr>
      <th style="text-align: left; font-size:24px" colspan="3">Products</th>
    </tr>
    <table width="100%" style="border:none;border-collapse: collapse;">
  
      <tr>
        <th style="text-align: left; width:5%">SN</th>
        <th style="text-align: left; width: 70%">Description</th>
        <th style="text-align: left; width: 10%">Unit Price</th>
        <th style="text-align: left; width: 5%">Qty.</th>
        <th style="text-align: left; width: 10%">Total</th>
      </tr>
  
      ${invoiceItems}
      <tr>
        <th style="text-align: left;" colspan="4">Total Amount: </th>
  
        <th style="text-align: left;">${invoiceData.bill_amount}</th>
      </tr>
  
    </table>
  
     <table width="100%" style="border:none;border-collapse: collapse;">
    <tr>
      <th style="text-align: left;">This is a computer generated invoice and does not require signature</th>
    </tr>
  </table>
  </table>
  
  </body>
  </html>`;
}
