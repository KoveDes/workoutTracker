const dateMonthFormatter = (date) =>
    date.toLocaleDateString('en-GB', {
        month: '2-digit',
        day: '2-digit'
    });
const dateYearFormatter = (date) =>
    new Date(date).toLocaleDateString('en-GB', {
        month: '2-digit',
        day: '2-digit',
        year: '2-digit',
    });
const dateYearsFormatter = (date) =>
    new Date(date).toLocaleDateString('en-GB', {
        month: '2-digit',
        year: 'numeric',
    });

const niceParam = input => input.replace(/([a-z])([A-Z])/g, '$1 $2');

const toDaysNamesFormatter = array => {
    return array.map(v => ["Sun", "Mon", "Tue", "Wed", "Thu", "Friday", "Sat"][v]);
}

const formatSeconds = seconds => {
    const minutes = Math.floor(seconds / 60);
    const remaining = seconds % 60;
    let output = '';
    if(minutes > 0) {
        output += minutes + ' m '
    }
    if (remaining > 0) {
        output += remaining + ' s';
    }
    return output
}
const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}


export default  dateMonthFormatter;
export {
    dateYearFormatter,
    dateYearsFormatter,
    niceParam,
    formatSeconds,
    toDaysNamesFormatter,
    formatTime
}

