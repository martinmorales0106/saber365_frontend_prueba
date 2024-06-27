import PropTypes from "prop-types";
import styles from "./Tabs.module.css";

const Tabs = ({
  tabs,
  selectedTab,
  onClick,
  orientation = "horizontal",
  className = styles.estilos1,
}) => {
  const activeTab = tabs.find((tab) => tab.index === selectedTab);
  return (
    <div className={className}>
      <div className={styles.fondo}>
        <div
          role="tablist"
          aria-orientation={orientation}
          className={styles.estilos6}
        >
          {tabs.map((tab) => (
            <button
              className={`${
                selectedTab === tab.index ? styles.estilos2 : styles.estilos3
              } ${styles.estilos4}`}
              onClick={() => onClick(tab.index)}
              key={tab.index}
              type="button"
              role="tab"
              aria-selected={selectedTab === tab.index}
              aria-controls={`tabpanel-${tab.index}`}
              tabIndex={selectedTab === tab.index ? 0 : -1}
              id={`btn-${tab.index}`}
            >
              {tab.label}
            </button>
          ))}
        <div className={styles.tiempo}>
          
        </div>
        </div>
        <div
          role="tabpanel"
          aria-labelledby={`btn-${selectedTab}`}
          id={`tabpanel-${selectedTab}`}
          className={styles.estilos5}
        >
          {activeTab && <activeTab.Component index={selectedTab} />}
        </div>
      </div>
    </div>
  );
};

Tabs.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.node.isRequired,
      index: PropTypes.string.isRequired,
      Component: PropTypes.elementType.isRequired,
    })
  ).isRequired,
  selectedTab: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  orientation: PropTypes.oneOf(["horizontal", "vertical"]),
  className: PropTypes.string,
};

export default Tabs;
