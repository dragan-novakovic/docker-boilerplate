import fetch from "isomorphic-unfetch";
import { useRouter } from "next/router";

function HomePage({ stars, user }) {
  const router = useRouter();
  const submitData = e => {
    e.preventDefault();
    const [userField, passField] = e.target.elements;
    const username = userField.value;
    const password = passField.value;

    console.log({ username, password });
    router.push("/user");
  };
  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
      <div class="w-full max-w-xs">
        <form
          class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={submitData}
        >
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="username"
            >
              Username
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
            />
          </div>
          <div class="mb-6">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="password"
            >
              Password
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
            />
            {/* <p class="text-red-500 text-xs italic">Please choose a password.</p> */}
          </div>
          <div class="flex items-center justify-between">
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign In
            </button>
            <a
              class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href="#"
            >
              Forgot Password?
            </a>
          </div>
        </form>
        <p class="text-center text-gray-500 text-xs">
          &copy;2020 Acme Corp. All rights reserved.
        </p>
      </div>
    </div>
  );
}

// Home page == LOGIN
// Your Posts /Create

HomePage.getInitialProps = async ({ req }) => {
  try {
    return { stars: 2, user: 2 };
  } catch (error) {
    console.log("Res", error);
    return { stars: "NaN" };
  }
};

export default HomePage;
