import React from 'react';
import PersianNumber from 'src/utils/PersianNumber';

export function numberRender(value, comma = false, EN = false) {
    return (
        <PersianNumber comma={comma} EN={EN}>
            {value}
        </PersianNumber>
    );
}
