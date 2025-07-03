import React from 'react';
import { FiPrinter } from 'react-icons/fi';
import printJS from 'print-js';
import './receipt.css';

function Receipt({
  orderNumber = '0001',
  date = '03-07-2025',
  time = '11:53 am',
  items = [
    { quantity: 2, name: 'Caramel Dream Latte (1 Regular, 1 Medium)', price: 300 }
  ],
  total = 300,
  cash = 500,
  change = 200,
  onStartNewOrder
}) {
  const handlePrint = () => {
    printJS({
      printable: 'print-receipt',
      type: 'html',
      style: `
        body { font-family: 'Poppins', sans-serif; }
        .print-receipt-box { max-width: 320px; margin: 0 auto; border: 1px solid #222; padding: 16px; }
        .print-title { font-size: 1.2rem; font-weight: bold; text-align: center; margin-bottom: 8px; }
        .print-row { display: flex; justify-content: space-between; margin-bottom: 4px; }
        .print-hr { border: none; border-top: 1px dashed #222; margin: 8px 0; }
        .print-queue { font-weight: bold; text-align: center; margin-top: 10px; }
      `
    });
  };

  return (
    <div className="receipt-bg">
      <div className="receipt-main-box">
        <div className="receipt-confirm">Order confirmed. Please prepare order.</div>
        <div className="receipt-box">
          <div className="receipt-header-row">
            <span className="receipt-title">Receipt:</span>
            <span className="receipt-date-block">
              <span className="receipt-date">{date}</span>
              <span className="receipt-time">{time}</span>
            </span>
          </div>
          <div className="receipt-table-head">
            <span className="receipt-th">Quantity</span>
            <span className="receipt-th">Product</span>
            <span className="receipt-th">Price</span>
          </div>
          {items.map((item, idx) => (
            <div className="receipt-table-row" key={idx}>
              <span className="receipt-td">{item.quantity}x</span>
              <span className="receipt-td">{item.name}</span>
              <span className="receipt-td">₱{item.price}</span>
            </div>
          ))}
          <div className="receipt-dotted" />
          <div className="receipt-table-row">
            <span className="receipt-td-bold">Total Amount:</span>
            <span className="receipt-td"></span>
            <span className="receipt-td-bold">₱{total}</span>
          </div>
          <div className="receipt-table-row">
            <span className="receipt-td-bold">Cash:</span>
            <span className="receipt-td"></span>
            <span className="receipt-td-bold">₱{cash}</span>
          </div>
          <div className="receipt-table-row">
            <span className="receipt-td-bold">Change:</span>
            <span className="receipt-td"></span>
            <span className="receipt-td-bold">₱{change}</span>
          </div>
          <div className="receipt-dotted" />
          <div className="receipt-queue">The Queue Number: <span className="receipt-queue-num">#{orderNumber}</span></div>
          <div className="receipt-print-row">
            <span className="receipt-print-label">Print Receipt:</span>
            <button className="receipt-print-btn" onClick={handlePrint}><FiPrinter size={22} /></button>
          </div>
        </div>
      </div>
      <button className="receipt-neworder-btn" onClick={onStartNewOrder}>Start New Order</button>
      {/* Hidden printable receipt template, now off-screen and without logo */}
      <div id="print-receipt" style={{ position: 'absolute', left: '-9999px', top: 0, width: '350px', background: '#fff', color: '#222' }}>
        <div className="print-receipt-box">
          <div className="print-title">AJH Bread & Beans</div>
          <div className="print-row"><span>Date:</span><span>{date}</span></div>
          <div className="print-row"><span>Time:</span><span>{time}</span></div>
          <hr className="print-hr" />
          <div className="print-row" style={{ fontWeight: 'bold' }}>
            <span>Qty</span><span>Product</span><span>Price</span>
          </div>
          {items.map((item, idx) => (
            <div className="print-row" key={idx}>
              <span>{item.quantity}x</span>
              <span style={{ maxWidth: 120, display: 'inline-block', wordBreak: 'break-word' }}>{item.name}</span>
              <span>₱{item.price}</span>
            </div>
          ))}
          <hr className="print-hr" />
          <div className="print-row"><span>Total:</span><span></span><span>₱{total}</span></div>
          <div className="print-row"><span>Cash:</span><span></span><span>₱{cash}</span></div>
          <div className="print-row"><span>Change:</span><span></span><span>₱{change}</span></div>
          <hr className="print-hr" />
          <div className="print-queue">Queue #: <b>#{orderNumber}</b></div>
        </div>
      </div>
    </div>
  );
}

export default Receipt;
