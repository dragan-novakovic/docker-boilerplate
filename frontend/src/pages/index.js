import fetch from 'isomorphic-unfetch';

function HomePage({ stars }) {
  return <div>The Secret: {stars}</div>;
}

HomePage.getInitialProps = async ({ req }) => {
  try {
    const res = await fetch('http://node-prod:5000/api/secret');
    const json = await res.json();
    return { stars: json.secret };
  } catch (error) {
    console.log('Res', error);
    return { stars: 'NaN' };
  }
};

export default HomePage;
