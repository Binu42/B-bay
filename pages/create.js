import { useState, useEffect } from 'react'
import { Form, Header, Input, TextArea, Button, Image, Message, Icon } from 'semantic-ui-react'
import Axios from 'axios';
import baseUrl from '../utils/baseUrl'
import catchErrors from '../utils/catchErrors'


const INTIAL_PRODUCT = {
  name: "",
  price: "",
  mediaUrl: "",
  description: ""
}
function CreateProduct() {
  const [product, setProduct] = useState(INTIAL_PRODUCT);
  const [mediaPreview, setMediaPreview] = useState('');
  const [success, setSucess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disabled, setdisabled] = useState(true);
  const [error, setError] = useState("")

  useEffect(() => {
    const isProduct = Object.values(product).every(el => Boolean(el));
    isProduct ? setdisabled(false) : setdisabled(true);
  }, [product])

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    if (name === "mediaUrl") {
      setProduct(prevState => ({ ...prevState, mediaUrl: files[0] }));
      setMediaPreview(window.URL.createObjectURL(files[0]));
    } else {
      setProduct(prevState => ({ ...prevState, [name]: value }));
    }
  }

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      setLoading(true);
      setError('');
      const mediaUrl = await handleImageUpload();
      const payload = { ...product, mediaUrl }
      const url = `${baseUrl}/api/product`
      const res = await Axios.post(url, payload);
      console.log(res)
      setProduct(INTIAL_PRODUCT);
      setSucess(true)
    } catch (err) {
      setSucess(false);
      catchErrors(err, setError);
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = async () => {
    const imagedata = new FormData();
    imagedata.append('cloud_name', process.env.cloudName);
    imagedata.append('upload_preset', 'BbaySelling');
    imagedata.append('file', product.mediaUrl);
    const response = await Axios.post(process.env.CLOUDINARY_URL, imagedata);
    // console.log(response.data)
    return response.data.url;
  }

  return <>
    <Header as="h2" block>
      <Icon name="add" color="green" />
      ADD NEW PRODUCT
    </Header>
    <Form loading={loading} error={Boolean(error)} success={success} onSubmit={handleSubmit}>
      <Message
        size="small"
        success
        icon="check"
        header="Successfully Posted"
        content="Your Product Posted Successfully"
      />
      <Message
        size="small"
        error
        header="OOPs!!"
        content="missing one or more fields..."
      />
      <Form.Group>
        <Form.Field
          control={Input}
          label="Name"
          name='name'
          placeholder="Enter Name"
          value={product.name}
          onChange={handleChange}
        />
        <Form.Field
          control={Input}
          label="Price"
          name='price'
          placeholder="Enter Price"
          min="0"
          step="1"
          type="number"
          value={product.price}
          onChange={handleChange}
        />
        <Form.Field
          control={Input}
          label="media"
          name='mediaUrl'
          content="Select Image"
          accept="image/*"
          type="file"
          onChange={handleChange}
        />
      </Form.Group>
      <Image src={mediaPreview} rounded size="medium" centered />
      <Form.Field
        control={TextArea}
        label="Description"
        value={product.description}
        name='description'
        placeholder="Give Some Detail About the Product"
        onChange={handleChange}
      />
      <Form.Field
        control={Button}
        content="submit"
        disabled={disabled || loading}
        icon="pencil alternate"
        color="green"
        type="submit"
      />
    </Form>
  </>;
}

export default CreateProduct;