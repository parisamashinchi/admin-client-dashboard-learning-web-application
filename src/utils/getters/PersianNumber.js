import React, {Component} from 'react';

export function toEnNumber(number) {
    if (!number || number === '') return '';
    return number
        .replace(/[\u0660-\u0669]/g, function(c) {
            return c.charCodeAt(0) - 0x0660;
        })
        .replace(/[\u06f0-\u06f9]/g, function(c) {
            return c.charCodeAt(0) - 0x06f0;
        });
}

export function toPersianNumber(number, comma) {
    if (!number || number === '') return '';
    let persianDigits = '۰۱۲۳۴۵۶۷۸۹';
    if (comma === true) {
        number = number
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    let persianMap = persianDigits.split('');
    return number.toString().replace(/\d/g, function(m) {
        return persianMap[parseInt(m)];
    });
}

class PersianNumber extends Component {
    render() {
        const {
            comma = true,
            moneySign = false,
            language = 'fa',
            children = '',
            className,
            style,
        } = this.props;
        if (children) {
            let en_number = children.toString();
            let persian_number = toPersianNumber(en_number, comma);
            return language === 'fa' ? (
                <span className={className} style={style}>
                    {persian_number} {moneySign ? 'ریال' : null}{' '}
                </span>
            ) : (
                <span className={className} style={style}>
                    {en_number} {moneySign ? 'Rial' : null}
                </span>
            );
        } else {
            return '';
        }
    }
}

export default PersianNumber;
