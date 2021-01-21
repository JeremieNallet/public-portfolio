import { useStore } from "../../lib/store";
import { CURSOR_OFFSET } from "../constant/mesure";

const resetCursorState = {
    alpha: false,
    size: 0.85,
    hoverBinding: { x: false, y: false },
    fill: true,
    active: true,
};

/**
 * @param {string} cursorType
 * eg. 'shrink', 'zoom' etc...
 */
export const useCursorAction = (cursorType) => {
    const setCursor = useStore((state) => state.setCursor);

    const cursorEnter = ({ currentTarget: target }) => {
        const { left, right, top, bottom } = target.getBoundingClientRect();

        const coord = {
            xMid: (right + left) / 2,
            yMid: (top + bottom) / 2,
            xLeft: Math.round(left - 17),
        };

        switch (cursorType) {
            case "shrink":
                setCursor({ size: 0 });
                break;
            case "zoom":
                setCursor({ size: 2, alpha: true });
                break;
            case "magnetic":
                setCursor({
                    hoverBinding: { x: coord.xLeft },
                    size: 0.2,
                });
                break;
            case "fit":
                setCursor({
                    hoverBinding: {
                        x: coord.xMid - CURSOR_OFFSET,
                        y: coord.yMid - CURSOR_OFFSET,
                    },
                });
                break;
            case "surround":
                setCursor({
                    hoverBinding: {
                        x: coord.xMid - CURSOR_OFFSET,
                        y: coord.yMid - CURSOR_OFFSET,
                    },

                    size: coord.xMid > 2000 ? 2.8 : 2,
                    fill: false,
                });
                break;
            default:
                return;
        }
    };

    const cursorOut = () => {
        setCursor(resetCursorState);
    };

    return { cursorEnter, cursorOut };
};

export default useCursorAction;
