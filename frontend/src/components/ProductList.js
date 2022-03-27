import React, {useState,useEffect} from 'react'
import axios from "axios";

function ProductList() {
    const [products, setProducts] = useState([]);

    useEffect(()=>{
        getProducts();
    },[]);

    const getProducts = async () => {
        const products = await axios.get('http://localhost:8080/products');
        // console.log(products.data)
        setProducts(products.data);
    }

    /* Fungsi formatRupiah */
		const formatRupiah = (angka, prefix)=>{
			var number_string = angka.replace(/[^,\d]/g, '').toString(),
			split   		= number_string.split(','),
			sisa     		= split[0].length % 3,
			rupiah     		= split[0].substr(0, sisa),
			ribuan     		= split[0].substr(sisa).match(/\d{3}/gi),
            separator='';
 
			// tambahkan titik jika yang di input sudah menjadi angka ribuan
			if(ribuan){
				separator = sisa ? '.' : '';
				rupiah += separator + ribuan.join('.');
			}
 
			rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
			return prefix == undefined ? rupiah : (rupiah ? 'Rp. ' + rupiah : '');
		}

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
              {products.map((product,index)=>(
                <tr key={product.id}>
                  <td>{index+1}</td>
                  <td>{product.title}</td>
                  <td>{formatRupiah(product.price, 'Rp. ')}</td>
                  <td>
                    <button className="button is-smal is-info">Edit</button>
                    <button className="button is-smal is-danger">Delete</button>
                  </td>
              </tr>
              ))}
          </tbody>
      </table>
    </div>
  );
}

export default ProductList;
