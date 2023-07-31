import _ from 'lodash';

const getValueOrDefault = value => (value ? value : '-');
export const mutate = (object, mutators) =>
    _.mapValues(
        object,
        (value, key) =>
            mutators[key] ? mutators[key](value) : getValueOrDefault(value)
    );
