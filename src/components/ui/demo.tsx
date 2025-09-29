import * as React from "react";
import { GooeyText } from "@/components/ui/gooey-text-morphing";
import { Typewriter } from "@/components/ui/typewriter-text";

function GooeyTextDemo() {
  return (
    <div className="h-[200px] flex items-center justify-center">
      <GooeyText
        texts={["Welkom", "bij", "Zutly"]}
        morphTime={1}
        cooldownTime={0.25}
        className="font-bold"
      />
    </div>
  );
}

const DemoVariant1 = () => {
  return (
    <>
      <Typewriter
        text={["Welkom bij Zutly", "Uw partner voor innovatie weboplossingen", "en digitale transformatie."]}
        speed={100}
        loop={true}
        className="text-xl font-medium"
      />
    </>
  )
}

export { GooeyTextDemo, DemoVariant1 };