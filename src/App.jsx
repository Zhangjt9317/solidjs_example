import logo from "./logo.svg";
import styles from "./App.module.css";

import {
  createEffect,
  createSignal,
  createMemo,
  createResource,
  Show,
  Switch,
  Match,
} from "solid-js";
import { render, Portal, Dynamic } from "solid-js/web";
const fetchUser = async (id) =>
  (await fetch(`https://swapi.dev/api/people/${id}/`)).json();

const User = () => {
  const [userId, setUserId] = createSignal();
  const [user] = createResource(userId, fetchUser);

  return (
    <>
      <input
        type="number"
        min="1"
        placeholder="Enter Numeric Id"
        onInput={(e) => setUserId(e.currentTarget.value)}
      />
      <span>{user.loading && "Loading..."}</span>
      <div>
        <pre>{JSON.stringify(user(), null, 2)}</pre>
      </div>
    </>
  );
};

function fibonacci(n) {
  if (n <= 1) return 1;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

function Modal() {
  return (
    <div class="container">
      <Portal>
        <div class="popup">
          <h1>Popup</h1>
          <p>Some text you might need for something or other.</p>
        </div>
      </Portal>{" "}
    </div>
  );
}

function Compare() {
  const [x] = createSignal(7);

  return (
    <Switch fallback={<p>{x()} is between 5 and 10</p>}>
      <Match when={x() > 10}>
        <p>{x()} is greater than 10</p>
      </Match>
      <Match when={5 > x()}>
        <p>{x()} is less than 5</p>
      </Match>
    </Switch>
  );
}

function Cats() {
  // <For each={}> to handle for loop, it updates or moves DOM rather than recreating them
  const [cats, setCats] = createSignal([
    { id: "J---aiyznGQ", name: "Keyboard Cat" },
    { id: "z_AbfPXTKms", name: "Maru" },
    { id: "OUtn3pvWmpg", name: "Henri The Existential Cat" },
  ]);
  return (
    <For each={cats()}>
      {(cat, i) => (
        <li>
          <a
            target="_blank"
            href={`https://www.youtube.com/watch?v=${cat.id}`}
            style={{ color: "white" }}
          >
            {i() + 1}: {cat.name}
          </a>
        </li>
      )}
    </For>
  );
}
// wrong naming would not work here
function Btn() {
  const [loggedIn, setLoggedIn] = createSignal(true);
  const toggle = () => setLoggedIn(!loggedIn());

  return (
    <Show when={loggedIn()} fallback={<button onClick={toggle}>Log in</button>}>
      <button onClick={toggle}>Log out</button>
    </Show>
  );
}

function Counter() {
  const [count, setCount] = createSignal(0);
  const fib = createMemo(() => fibonacci(count()));
  const doubleCount = () => count() * 2;
  createEffect(() => {
    console.log("the count is: ", count());
  });
  return (
    <>
      <button onClick={() => setCount(count() + 1)}>Click Me</button>
      {count()} <br />
      {doubleCount()} <br />
      fib: {fib()}
    </>
  );
}

function App() {
  return (
    <div class={styles.App}>
      <p>Counter demos how signal and createEffect / createMemo work</p>
      <Counter /> <p>Btn demos how simple conditional works in Solid</p>
      <Btn />
      <p>Cats demos how list rendering works using For tag </p>
      <Cats />
      <p>Compare demos how switch and match work</p>
      <Compare />
      <p>Modal demos how Portal works </p>
      <Modal />
      <p>Async demos </p>
      <User />
    </div>
  );
}

export default App;
