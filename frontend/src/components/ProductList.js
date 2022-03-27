import React, {useState,useEffect} from 'react'
import axios from "axios";

function ProductList() {
  return (
    <div>
      <table className='table is-striped is-fullwidth'>
          <thead>
              <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Price</th>
                  <th>Act</th>
              </tr>
          </thead>
          <tbody>
              <tr>
                  <td>1</td>
                  <td>Products 1</td>
                  <td>4000</td>
                  <td>
                    <button className="button is-smal is-info">Edit</button>
                    <button className="button is-smal is-danger">Delete</button>
                  </td>
              </tr>
          </tbody>
      </table>
    </div>
  );
}

export default ProductList;
