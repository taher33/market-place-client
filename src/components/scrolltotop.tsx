import { useEffect } from "react";
import { withRouter, useHistory } from "react-router-dom";

interface Props {}

function ScrollToTop({}: Props) {
  const history = useHistory();
  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0);
    });
    return () => {
      unlisten();
    };
  }, []);

  return null;
}

export default withRouter(ScrollToTop);
