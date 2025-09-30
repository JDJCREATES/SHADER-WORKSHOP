

export default function Header({children}: {children?: React.ReactNode}) {

    return (
        <header className="app-header">
            <h1 className="app-title">Shader Demo Application</h1>
            {children && <div className="header-children">{children}</div>}
            
        </header>
    );
}