import { blueDark, pink, mauve } from "@radix-ui/colors";

interface Scale {
  step1: string;
  step2: string;
  step3: string;
  step4: string;
  step5: string;
  step6: string;
  step7: string;
  step8: string;
  step9: string;
  step10: string;
  step11: string;
  step12: string;
}

const f = (color: any) =>
  Object.fromEntries(
    Object.entries(color).map(([key, value]) => {
      let id = "";
      for (let c of key) {
        if ("0" <= c && c <= "9") {
          id += c;
        }
      }

      return [`step${id}`, value];
    })
  ) as unknown as Scale;

const primary = f(pink);
const gray = f(mauve);

export const colors = {
  background: gray.step1,
  outline: primary.step7,
  highlightedText: primary.step11,
  text: gray.step12,
  ...primary,

  // special colors
  link: blueDark.blue11,
};
