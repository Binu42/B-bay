import { Container, Pagination } from 'semantic-ui-react'
import { useRouter } from 'next/router'

function ProductPagination({ totalPages }) {
  // console.log(totalPages);
  const Router = useRouter();
  return <Container textAlign="center" style={{ margin: '2em' }}>
    <Pagination
      defaultActivePage={1}
      totalPages={totalPages}
      onPageChange={(event, data) => {
        data.activePage === 1 ? Router.push('/') : Router.push(`/?page=${data.activePage}`)
      }}
    />
  </Container>;
}

export default ProductPagination;
