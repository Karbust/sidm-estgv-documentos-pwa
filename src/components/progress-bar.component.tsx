const ProgressBar = (props) => {
    const { bgcolor, completed } = props;

    const containerStyles = {
        height: '1.5em',
        width: '100%',
        backgroundColor: "#403d39",
        borderRadius: '11px',
        margin: 0
    }

    const fillerStyles = {
        height: '100%',
        width: `${completed}%`,
        backgroundColor: bgcolor,
        borderRadius: '11px',
        textAlign: 'right',
        transition: 'width 1s ease-in-out',
    }

    const labelStyles = {
        padding: 5,
        color: 'white',
        fontSize: '0.7em',
        float: 'left'
    }

    return (
        <div style={containerStyles}>
            <div style={fillerStyles}>
                <span style={labelStyles}>{`${completed}%`}</span>
            </div>
        </div>
    );
};

export default ProgressBar;
