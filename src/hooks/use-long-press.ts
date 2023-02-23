import {
  EventHandler,
  MouseEvent,
  MouseEventHandler,
  TouchEvent,
  TouchEventHandler,
  useCallback,
  useRef,
} from "react";

type LongPressEvents<T extends Element> = {
  onMouseDown: MouseEventHandler<T>;
  onMouseUp: MouseEventHandler<T>;
  onMouseLeave: MouseEventHandler<T>;
  onTouchStart: TouchEventHandler<T>;
  onTouchEnd: TouchEventHandler<T>;
};

type UseLongPressHook<T extends Element> = LongPressEvents<T>;

type UseLongPressProps<T extends Element> = Partial<LongPressEvents<T>> & {
  onLongPress: EventHandler<MouseEvent<T> | TouchEvent<T>>;
};

/**
 * TODO: this needs to implemented once we need long press functionality.
 */
function useLongPress<T extends Element>(
  props: UseLongPressProps<T>
): UseLongPressHook<T> {
  const { onLongPress } = props;
  const timeoutRef = useRef<number>();

  const start = useCallback(
    (event: MouseEvent<T> | TouchEvent<T>) => {
      const ref = setTimeout(() => onLongPress(event));
    },
    [onLongPress]
  );

  return {
    onMouseLeave: () => {},
    onMouseUp: () => {},
    onTouchEnd: () => {},
    onTouchStart: () => {},
    onMouseDown: () => {},
  };
}
