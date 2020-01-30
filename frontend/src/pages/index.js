import fetch from "isomorphic-unfetch";

function HomePage({ stars, user }) {
  return (
    <div>
      The Secret: {stars}
      <br />
      <div>
        Stuff for db: {user.id}_{user.name}
      </div>
    </div>
  );
}

HomePage.getInitialProps = async ({ req }) => {
  try {
    const res = await fetch("http://node-prod:5000/api/secret");
    const res_table = await (
      await fetch("http://node-prod:5000/api/test")
    ).json();

    const json = await res.json();
    return { stars: json.secret, user: res_table.time };
  } catch (error) {
    console.log("Res", error);
    return { stars: "NaN" };
  }
};

export default HomePage;
