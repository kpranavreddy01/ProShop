import { useState,useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import {  useGetProductDetailsQuery, useUpdateProductMutation, useUploadProductImageMutation } from "../slices/productsApiSlices";
import Loader from "../components/loader";
import Message from "../components/message";
import FormContainer from "../components/FormContainer";
import { toast } from "react-toastify";



const ProductsEditScreen = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState('');
    const [updateProduct, { isLoading: loadingUpdate }] = useUpdateProductMutation();
    const [uploadProductImage] = useUploadProductImageMutation(); //{isLoading: loadingUpload}

    const {data: product, isLoading, error} = useGetProductDetailsQuery(id);
    // console.log(product);
    const uploadFileHandler = async(e) => {
        const formData = new FormData();
        formData.append('image',e.target.files[0]);
        try {
            const res = await uploadProductImage(formData).unwrap();
            toast.success(res.message);
            setImage(res.image);
        } catch (error) {
            toast.error(error?.data?.message || error.error);
        }
    }


    
    useEffect(() => {
        if(product){
            setName(product.name);
            setPrice(product.price);
            setImage(product.image);
            setBrand(product.brand);
            setCategory(product.category);
            setCountInStock(product.countInStock);
            setDescription(product.description);

        }
    }, [product]);
        
  return (
    <>
    <Link to='/admin/productlist' className='btn btn-light my-3'>Go Back</Link>
    <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader />}

        {isLoading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
            <Form onSubmit={async(e) => {
                e.preventDefault();
                try {
                    await updateProduct({_id: id, name, price, image, brand, category, countInStock, description});
                    toast.success('Product Updated');
                    navigate('/admin/productlist');
                } catch (error) {
                    toast.error(error?.data?.message || error.error);
                }
            }}>
                <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type='text' placeholder='Enter Name' value={name} onChange={e => setName(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='price'>
                    <Form.Label>Price</Form.Label>
                    <Form.Control type='number' placeholder='Enter Price' value={price} onChange={e => setPrice(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='image'>
                    <Form.Label>Image</Form.Label>
                    <Form.Control type='text' placeholder='Enter Image' value={image} onChange={e => setImage(e.target.value)}></Form.Control>
                    <Form.Control type="file" label='choose-file' onChange={uploadFileHandler}></Form.Control>

                    </Form.Group>
                <Form.Group controlId='brand'>
                    <Form.Label>Brand</Form.Label>
                    <Form.Control type='text' placeholder='Enter Brand' value={brand} onChange={e => setBrand(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='category'>
                    <Form.Label>Category</Form.Label>
                    <Form.Control type='text' placeholder='Enter Category' value={category} onChange={e => setCategory(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='countInStock'>
                    <Form.Label>Count In Stock</Form.Label>
                    <Form.Control type='number' placeholder='Enter Count In Stock' value={countInStock} onChange={e => setCountInStock(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='description'>
                    <Form.Label>Description</Form.Label>
                    <Form.Control type='text' placeholder='Enter Description' value={description} onChange={e => setDescription(e.target.value)}></Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary'>Update</Button>
            </Form>
        )}
            
    </FormContainer>   


    </>
  )
}

export default ProductsEditScreen