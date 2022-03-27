<?php

namespace App\Controllers;

use CodeIgniter\API\ResponseTrait;
use CodeIgniter\RESTful\ResourceController;
use App\Models\ProductModel;

class Products extends ResourceController
{

    public function __construct()
    {
        $this->model = new ProductModel();
    }

    /**
     * Return an array of resource objects, themselves in array format
     *
     * @return mixed
     */
    use ResponseTrait;
    public function index()
    {
        $data = $this->model->findAll();
        return $this->respond($data);
    }

    /**
     * Return the properties of a resource object
     *
     * @return mixed
     */
    public function show($id = null)
    {
        $data = $this->model->find(['id' => $id]);
        if (!$data) return $this->failNotFound('No data Found!');
        return $this->respond($data[0]);
    }

    /**
     * Create a new resource object, from "posted" parameters
     *
     * @return mixed
     */
    public function create()
    {
        helper('form');

        $rules = [
            'title' => 'required',
            'price' => 'required'
        ];

        $data = [
            'title' => $this->request->getVar('title'),
            'price' => $this->request->getVar('price')
        ];

        if (!$this->validate($rules)) return $this->fail($this->validator->getErrors());

        $this->model->save($data);

        $response = [
            'status' => 201,
            'error' => null,
            'massages' => [
                'success' => "Data Inserted!"
            ]
        ];

        return $this->respondCreated($response);
    }

    /**
     * Add or update a model resource, from "posted" properties
     *
     * @return mixed
     */
    public function update($id = null)
    {
        helper('form');

        $rules = [
            'title' => 'required',
            'price' => 'required'
        ];

        $data = [
            'title' => $this->request->getVar('title'),
            'price' => $this->request->getVar('price')
        ];

        if (!$this->validate($rules)) return $this->fail($this->validator->getErrors());
        $findById = $this->model->find(['id' => $id]);
        if (!$findById) return $this->failNotFound('No data Found!');

        $this->model->update($id, $data);

        $response = [
            'status' => 200,
            'error' => null,
            'massages' => [
                'success' => "Data Updated!"
            ]
        ];

        return $this->respond($response);
    }

    /**
     * Delete the designated resource object from the model
     *
     * @return mixed
     */
    public function delete($id = null)
    {
        $findById = $this->model->find(['id' => $id]);
        if (!$findById) return $this->failNotFound('No data Found!');

        $this->model->delete($id);

        $response = [
            'status' => 200,
            'error' => null,
            'massages' => [
                'success' => "Data Deleted!"
            ]
        ];

        return $this->respond($response);
    }
}
