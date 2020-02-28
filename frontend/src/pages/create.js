import Layout from "../components/Layout";
import fetch from "isomorphic-unfetch";

import { UserContext } from "./_app";

export default function CreatePost() {
  const userCtx = React.useContext(UserContext);

  const submitForm = async e => {
    e.preventDefault();
    const [titleField, contentField] = e.target.elements;
    //console.log(userCtx.userId);
    const response = await (
      await fetch("node-prod:5000/api/user-posts", {
        method: "POST",
        body: JSON.stringify({
          user_id: userCtx.userId,
          title: titleField.value,
          description: contentField.value
        })
      })
    ).json();

    // console.log(response);
  };
  return (
    <Layout>
      <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
        <form className="w-full max-w-lg" onSubmit={submitForm}>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-first-name"
              >
                Title
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="text"
                placeholder="Lorem"
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Content
              </label>
              <textarea
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-password"
                type="password"
                placeholder="******************"
              />
              <p className="text-gray-600 text-xs italic">
                Make it as long and as crazy as you'd like
              </p>
            </div>
            <button
              className="w-full px-3"
              type="submit"
              style={{ marginTop: 10 }}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
