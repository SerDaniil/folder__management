import { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router";
import "./style.css";
import { Link } from "react-router-dom";

interface LinkData {
  id: number;
  name: string;
  link: string;
}

interface ServiceData {
  id: number;
  name: string;
  link: string;
  description: string;
}

export default function Header(): JSX.Element {
  const underlineRef = useRef<HTMLDivElement>(null);
  const [isExtended, setIsExtended] = useState<boolean>(false);
  const [activeLink, setActiveLink] = useState<LinkData | null>(null);
  const [activeServiceLink, setActiveServiceLink] =
    useState<ServiceData | null>(null);
  const [showLink, setShowLink] = useState(false);
  const [showServiceLink, setShowServiceLink] = useState(false);

  const headerLinks: LinkData[] = [
    { id: 1, name: "Главная", link: "/" },
    { id: 2, name: "Услуги", link: "/services" },
    { id: 3, name: "Портфолио", link: "/portfolio" },
    { id: 4, name: "О нас", link: "/info" },
  ];
  const handleLinkMouseEnter = (headerLink: LinkData): void => {
    if (activeLink === null || headerLink.id !== activeLink.id) {
      setIsExtended(true);
      setActiveLink(headerLink);
      setActiveServiceLink(null);
    }
  };

  const handleMouseLeave = (): void => {
    setIsExtended(false);
    setActiveLink(null);
    setActiveServiceLink(null);
  };

  useEffect(() => {
    if (activeLink && underlineRef.current) {
      const linkElement = document.querySelector(
        `.navbar__link:nth-child(${activeLink.id})`
      ) as HTMLElement;
      if (linkElement) {
        const left = linkElement.offsetLeft;
        const width = linkElement.offsetWidth;
        underlineRef.current.style.left = `${left}px`;
        underlineRef.current.style.width = `${width}px`;
      }
    }
  }, [activeLink]);

  useEffect(() => {
    if (isExtended) {
      if (activeLink) {
        let timeout: NodeJS.Timeout;
        setShowLink(false);
        timeout = setTimeout(() => {
          setShowLink(true);
        }, 300);

        return () => {
          clearTimeout(timeout);
        };
      }
    } else {
      setShowLink(false);
    }
  }, [activeLink, isExtended]);

  const logo = "NAIL|IZBAEV";

  const services: ServiceData[] = [
    {
      id: 1,
      name: "Анимационные ролики 2D",
      link: "/",
      description: "Описание Анимационные ролики 2D",
    },
    {
      id: 2,
      name: "Анимационные ролики 3D",
      link: "/",
      description: "Описание Анимационные ролики 3D",
    },
    {
      id: 3,
      name: "3D моделирование",
      link: "/",
      description: "Описание 3D моделирование",
    },
    {
      id: 4,
      name: "Дополненная реальность",
      link: "/",
      description: "Описание Дополненная реальность",
    },
    {
      id: 5,
      name: "Заказать видеоролик",
      link: "/",
      description: "Описание Заказать видеоролик",
    },
    {
      id: 6,
      name: "Заказать видеосъемку",
      link: "/",
      description: "Описание Заказать видеосъемку",
    },
  ];

  const textInfo = (
    <p>
      Мы - профессиональная креативная команда, предоставляющая высококлассные
      визуальные решения для бизнеса и индустрии развлечений.
      <br />
      Наши основные направления деятельности включают анимацию, 3D-моделирование
      и производство видео премиум-качества.
      <br />
      Мы предлагаем широкий спектр услуг, тщательно адаптированных к
      индивидуальным требованиям каждого клиента.
    </p>
  );

  const headerRef = useRef<HTMLDivElement | null>(null);
  const expandedRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const headerElement = headerRef.current;
    const expandedElement = expandedRef.current;
    if (headerElement && expandedElement) {
      let expandedContentHeight = isExtended ? expandedElement.offsetHeight : 0;
      const newHeight = isExtended ? expandedContentHeight + 45 : 45; // если isExtended, добавляем 45, иначе высота 45

      headerElement.style.height = `${newHeight}px`;
    }
  }, [activeLink, activeServiceLink]);

  const handleServiceMouseEnter = (service: ServiceData): void => {
    if (activeServiceLink === null || service.id !== activeServiceLink.id) {
      setActiveServiceLink(service);
    }
  };

  useEffect(() => {
    if (isExtended) {
      if (activeServiceLink) {
        let timeout: NodeJS.Timeout;
        setShowServiceLink(false);
        timeout = setTimeout(() => {
          setShowServiceLink(true);
        }, 200);

        return () => {
          clearTimeout(timeout);
        };
      }
    } else {
      setShowServiceLink(false);
    }
  }, [activeServiceLink, isExtended]);

  return (
    <>
      <header
        className={`header ${isExtended && "extended"}`}
        onMouseLeave={handleMouseLeave}
        ref={headerRef}
      >
        <div className="header__content">
          <div className="logo">{logo}</div>
          <nav>
            <ul className="header__navbar">
              {headerLinks &&
                headerLinks.map((headerLink, index) => (
                  <li className="navbar__link">
                    <Link
                      key={index}
                      to={headerLink.link}
                      onMouseEnter={() => handleLinkMouseEnter(headerLink)}
                    >
                      <p>{headerLink.name}</p>
                    </Link>
                  </li>
                ))}
              <div className="underline" ref={underlineRef}></div>
            </ul>
          </nav>
        </div>
        <div
          className={`header__expandedContent ${showLink && "show"}`}
          ref={expandedRef}
        >
          {isExtended && activeLink && (
            <div className="expandedContent__container">
              {activeLink.id === 2 && (
                <div className="expandedContent__services">
                  <div className="services__content">
                    {services &&
                      services.map((service) => (
                        <Link
                          to={service.link}
                          key={service.id}
                          onMouseEnter={() => handleServiceMouseEnter(service)}
                        >
                          {service.name}
                        </Link>
                      ))}
                  </div>
                  {activeServiceLink && (
                    <div
                      className={`services__descripton ${
                        showServiceLink && "show"
                      }`}
                    >
                      {activeServiceLink.description}
                    </div>
                  )}
                </div>
              )}
              {activeLink.id === 3 && (
                <div className="expandedContent__portfolio">
                  <div>
                    <div>{textInfo}</div>
                  </div>
                </div>
              )}
              {activeLink.id === 4 && (
                <div className="expandedContent__info">
                  <div>{textInfo}</div>
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      <Outlet />
    </>
  );
}
