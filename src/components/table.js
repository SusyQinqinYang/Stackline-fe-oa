import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrProduct } from '../redux/productSlice';
import './table.css';

export default function TableComponent(props) {
  const currentProduct = useSelector(selectCurrProduct);
  const [sortCriteria, setSortCriteria] = useState("weekEnding");

  const formatDate = (dateString) => {
    let parts = dateString.split("-");
    let rearranged = parts.slice(1,3).concat([parts[0].substring(2)]);
    return rearranged.join("-");
  };

  const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
  });

  const sortSalesData = (salesData) => {
    let salesCopy = [...salesData];
    return salesCopy.sort((a, b) => {
      if (a[sortCriteria] === b[sortCriteria]) {
        return 0;
      } else if (a[sortCriteria] > b[sortCriteria]) {
        return 1;
      }
      return -1;
    });
  };

  const TableHeader = (headerProps) => {
    return (
      <th className="custom-header" onClick={() => setSortCriteria(headerProps.attribute)}>
        {headerProps.label}
        <img src="/arrow.svg" alt="Sort Arrow"/>
      </th>
    );
  };

  return (
    <div className={props.className + " product-table-wrapper"}>
      <table className="product-table">
        <thead>
          <tr>
            <TableHeader attribute="weekEnding" label="WEEK ENDING" />
            <TableHeader attribute="retailSales" label="RETAIL SALES" />
            <TableHeader attribute="wholesaleSales" label="WHOLESALE SALES" />
            <TableHeader attribute="unitsSold" label="UNITS SOLD" />
            <TableHeader attribute="retailerMargin" label="RETAILER MARGIN" />
          </tr>
        </thead>
        <tbody>
          {currentProduct.sales && sortSalesData(currentProduct.sales).map((saleItem, idx) => (
            <tr key={idx}>
              <td>{formatDate(saleItem.weekEnding)}</td>
              <td>{currencyFormatter.format(saleItem.retailSales)}</td>
              <td>{currencyFormatter.format(saleItem.wholesaleSales)}</td>
              <td>{saleItem.unitsSold}</td>
              <td>{currencyFormatter.format(saleItem.retailerMargin)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
