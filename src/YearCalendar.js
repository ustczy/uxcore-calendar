import YearPanel from 'rc-calendar/lib/year/YearPanel';
import CalendarMixin from 'rc-calendar/lib/mixin/CalendarMixin';
import {KeyCode} from 'rc-util';

const YearCalendar = React.createClass({
    mixins: [CalendarMixin],

    onKeyDown(e) {
        const keyCode = e.keyCode;
        const ctrlKey = e.ctrlKey || e.metaKey;
        const stateValue = this.state.value;
        let value = stateValue;
        switch (keyCode) {
        case KeyCode.DOWN:
            value = stateValue.clone();
            value.addMonth(3);
            break;
        case KeyCode.UP:
            value = stateValue.clone();
            value.addMonth(-3);
            break;
        case KeyCode.LEFT:
            value = stateValue.clone();
            if (ctrlKey) {
                value.addYear(-1);
            } else {
                value.addMonth(-1);
            }
            break;
        case KeyCode.RIGHT:
            value = stateValue.clone();
            if (ctrlKey) {
                value.addYear(1);
            } else {
                value.addMonth(1);
            }
            break;
        case KeyCode.ENTER:
            this.onSelect(stateValue);
            e.preventDefault();
            return 1;
        default:
            return undefined;
        }
        if (value !== stateValue) {
            this.setValue(value);
            e.preventDefault();
            return 1;
        }
    },

    render() {
        const props = this.props;
        const children = (
            <YearPanel locale={props.locale}
                disabledDate={props.disabledDate}
                value={this.state.value}
                rootPrefixCls={props.prefixCls}
                onChange={this.setValue}
                onSelect={this.onSelect}/>
            );
        return this.renderRoot({
            children,
        });
    }
});

export default YearCalendar;