/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const AddProduct = () => { 
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const history = useHistory();

    const saveProduct = async (e) =>{
      e.preventDefault();
      await axios.post('http://localhost:8080/products',{
        'title':title,
        'price':price
      });
      history.push("/");
    }

    useEffect(()=>{
      const rupiah = document.getElementById('rupiah');
      rupiah.addEventListener('keyup', function(e){
        // tambahkan 'Rp.' pada saat form di ketik
        // gunakan fungsi formatRupiah() untuk mengubah angka yang di ketik menjadi format angka
        rupiah.value = formatRupiah(this.value, 'Rp. ');
      });
    });

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
 
			rupiah = split[1] !== undefined ? rupiah + ',' + split[1] : rupiah;
			return prefix === undefined ? rupiah : (rupiah ? 'Rp. ' + rupiah : '');
		}
  return (
    <div>
      <form onSubmit={saveProduct}>
        <div className="field">
          <label className="label">Title</label>
          <input
            type="text"
            className='input'
            placeholder='Title'
            value={ title }
            onChange={ (e)=> setTitle(e.target.value) } 
          />
        </div>
        <div className="field">
          <label className="label">Price</label>
            <input
                type="text"
                className='input'
                placeholder='Price'
                id='rupiah'
                value={ price }
                onChange={ (e)=> setPrice(e.target.value) }
            />
        </div>
        <div className="field">
            <button type='submit' className="button is-primary">Save</button>
        </div>
      </form>
    </div>
  );
}

export default AddProduct;
