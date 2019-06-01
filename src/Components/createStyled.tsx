import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

export function createStyled(styles: any, options?: any) {
    function Styled(props: any) {
        const { children, ...other } = props;
        return children(other);
    }
    Styled.propTypes = {
        children: PropTypes.func.isRequired,
        classes: PropTypes.object.isRequired,
    };
    return withStyles(styles, options)(Styled);
}
