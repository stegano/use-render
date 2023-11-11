import ReactTestRender from "react-test-renderer";
import { useCallback, useEffect } from "react";
import { useSuspenseRender } from "./hooks";
import { SuspenseRenderProvider } from "./providers";

const delay = (ms: number) =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });

describe("`useSuspenseRender` Testing", () => {
  it("When the async task succeeds", async () => {
    const TestComponent = () => {
      const asyncTask = useCallback(
        async () =>
          new Promise((resolve) => {
            setTimeout(resolve, 100);
          }),
        [],
      );
      const [suspenseRender, runAsyncTask] = useSuspenseRender<string>();
      useEffect(() => {
        runAsyncTask(async () => {
          await asyncTask();
          return "Aaa";
        });
      }, [asyncTask, runAsyncTask]);
      return suspenseRender((data) => <p>Success({data})</p>, <p>Loading</p>, <p>Error</p>);
    };
    const component = ReactTestRender.create(<TestComponent />);
    const state1 = component.toJSON() as ReactTestRender.ReactTestRendererJSON;
    expect(state1.children?.join("")).toEqual("Loading");
    await ReactTestRender.act(async () => {
      await delay(100 * 2);
      const state2 = component.toJSON() as ReactTestRender.ReactTestRendererJSON;
      expect(state2.children?.join("")).toEqual("Success(Aaa)");
    });
  });
  it("When the async task encounters an error", async () => {
    const TestComponent = () => {
      const asyncErrorTask = useCallback(
        async () =>
          new Promise((_, reject) => {
            setTimeout(() => reject(new Error("Err")), 100);
          }),
        [],
      );
      const [suspenseRender, runAsyncTask] = useSuspenseRender<string, Error>();
      useEffect(() => {
        runAsyncTask(async () => {
          await asyncErrorTask();
          return "Aaa";
        });
      }, [asyncErrorTask, runAsyncTask]);
      return suspenseRender(
        (data) => <p>Success({data})</p>,
        <p>Loading</p>,
        (e) => <p>Error({e.message})</p>,
      );
    };
    const component = ReactTestRender.create(<TestComponent />);
    const state1 = component.toJSON() as ReactTestRender.ReactTestRendererJSON;
    expect(state1.children?.join("")).toEqual("Loading");
    await ReactTestRender.act(async () => {
      await delay(100 * 2);
      const state2 = component.toJSON() as ReactTestRender.ReactTestRendererJSON;
      expect(state2.children?.join("")).toEqual("Error(Err)");
    });
  });
  it("When the async task succeeds(with provider)", async () => {
    const TestComponent = () => {
      const asyncTask = useCallback(
        async () =>
          new Promise((resolve) => {
            setTimeout(resolve, 100);
          }),
        [],
      );
      const [suspenseRender, runAsyncTask] = useSuspenseRender<string>();
      useEffect(() => {
        runAsyncTask(async () => {
          await asyncTask();
          return "Aaa";
        });
      }, [asyncTask, runAsyncTask]);
      return suspenseRender((data) => <p>Success({data})</p>);
    };
    const component = ReactTestRender.create(
      <SuspenseRenderProvider
        renderSuccess={<p>Success(Provider)</p>}
        renderLoading={<p>Loading(Provider)</p>}
      >
        <TestComponent />
      </SuspenseRenderProvider>,
    );
    const state1 = component.toJSON() as ReactTestRender.ReactTestRendererJSON;
    // The provider is used because the component does not have its own render function.
    expect(state1.children?.join("")).toEqual("Loading(Provider)");
    await ReactTestRender.act(async () => {
      await delay(100 * 2);
      const state2 = component.toJSON() as ReactTestRender.ReactTestRendererJSON;
      // The provider is not used because the component has its own render function.
      expect(state2.children?.join("")).toEqual("Success(Aaa)");
    });
  });
  it("When the async task encounters an error(with provider)", async () => {
    const TestComponent = () => {
      const asyncTask = useCallback(
        async () =>
          new Promise((_, reject) => {
            setTimeout(() => reject(new Error("Err")), 100);
          }),
        [],
      );
      const [suspenseRender, runAsyncTask] = useSuspenseRender<string>();
      useEffect(() => {
        runAsyncTask(async () => {
          await asyncTask();
          return "Aaa";
        });
      }, [asyncTask, runAsyncTask]);
      return suspenseRender((data) => <p>Success({data})</p>);
    };
    const component = ReactTestRender.create(
      <SuspenseRenderProvider
        renderError={<p>Error(Provider)</p>}
        renderLoading={<p>Loading(Provider)</p>}
      >
        <TestComponent />
      </SuspenseRenderProvider>,
    );
    const state1 = component.toJSON() as ReactTestRender.ReactTestRendererJSON;
    // The provider is used because the component does not have its own render function.
    expect(state1.children?.join("")).toEqual("Loading(Provider)");
    await ReactTestRender.act(async () => {
      await delay(100 * 2);
      const state2 = component.toJSON() as ReactTestRender.ReactTestRendererJSON;
      // The provider is not used because the component has its own render function.
      expect(state2.children?.join("")).toEqual("Error(Provider)");
    });
  });
  it("When the async task succeeds(with options.defaultData)", async () => {
    const TestComponent = () => {
      const asyncTask = useCallback(
        async () =>
          new Promise((resolve) => {
            setTimeout(resolve, 100);
          }),
        [],
      );
      const [suspenseRender, runAsyncTask] = useSuspenseRender<string>({
        defaultData: "DefaultData",
      });
      useEffect(() => {
        runAsyncTask(async () => {
          await asyncTask();
          return "Aaa";
        });
      }, [asyncTask, runAsyncTask]);
      return suspenseRender((data) => <p>Success({data})</p>, <p>Loading</p>, <p>Error</p>);
    };
    const component = ReactTestRender.create(<TestComponent />);
    const state1 = component.toJSON() as ReactTestRender.ReactTestRendererJSON;
    expect(state1.children?.join("")).toEqual("Success(DefaultData)");
    await ReactTestRender.act(async () => {
      await delay(100 * 2);
      const state2 = component.toJSON() as ReactTestRender.ReactTestRendererJSON;
      expect(state2.children?.join("")).toEqual("Success(Aaa)");
    });
  });
});
