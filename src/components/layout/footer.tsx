export default function Footer() {
    return (
      <footer className="flex w-full bottom-0 py-4 mt-12">
        <p className="dark:text-zinc-400 text-zinc-700 m-0 text-sm">
          <a
            className="dark:text-zinc-300 text-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-200 duration-300 underline decoration-dotted underline-offset-4"
            href="https://opensource.org/licenses/MIT"
            target={"_blank"}
            rel="noreferrer"
          >
            MIT
          </a>{" "}
          2024-present &#169;{" "}
          <a
            className="dark:text-zinc-300 dark:hover:text-zinc-200 text-zinc-800 hover:text-zinc-900 duration-300 underline decoration-dotted underline-offset-4"
            href="https://next-js-portfolio-one-zeta.vercel.app/"
            target={"_blank"}
            rel="noreferrer"
          >
            phong28zk
          </a>
        </p>
      </footer>
    );
  }