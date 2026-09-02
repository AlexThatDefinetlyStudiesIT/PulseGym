export const Ender=() => {
    return (
        <footer style={footerStyle}>
            <div className="container pt-3 pb-3">
                © Все права защищены.
            </div>
        </footer>
    );
};


const footerStyle: React.CSSProperties = {
    backgroundColor: '#222222',
    color: '#999999',
    position: 'fixed',
    bottom: 0,
    width: '100%',
    height: '10%',
    fontSize: '0.8rem',
    textAlign: 'left',
    fontFamily: 'Arial Black, sans-serif'
};