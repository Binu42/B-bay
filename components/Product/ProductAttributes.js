import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { Header, Button, Modal } from 'semantic-ui-react'
import baseUrl from '../../utils/baseUrl'

function ProductAttributes({ description, _id, user }) {
  const [modal, setModal] = useState(false)
  const Router = useRouter();
  const isAdmin = user && user.role === "admin";
  const isRoot = user && user.role === "root";
  const isRootOrAdmin = isRoot || isAdmin;

  const handleDelete = async () => {
    const payload = { params: { _id } };
    const url = `${baseUrl}/api/product`;
    await axios.delete(url, payload);
    Router.push('/');
  }

  return <>
    <Header as='h3'>About the product</Header>
    <p>
      {description}
    </p>
    {isRootOrAdmin && (<>
      <Button
        icon='trash alternate outline'
        color='red'
        content="Delete this Product"
        onClick={() => setModal(true)}
      />
      <Modal dimmer="blurring" open={modal}>
        <Modal.Header>Confirm Deletion</Modal.Header>
        <Modal.Content>
          <p>Are you Sure you want to delete this Product</p>
        </Modal.Content>
        <Modal.Actions>
          <Button content="cancel"
            onClick={() => setModal(false)}
          />
          <Button
            icon="trash"
            color="red"
            content="Delete"
            onClick={handleDelete}
          />
        </Modal.Actions>
      </Modal>
    </>)}
  </>;
}

export default ProductAttributes;
