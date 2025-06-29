"use client";
import React from "react";
import Link from "next/link";
import styles from "./styles.module.css";

export default function AdminDashboard() {
  return (
    <div className={styles.container}>
      {/* Header Section */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.welcomeSection}>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/user-icon.png?placeholderIfAbsent=true&apiKey=4347c25cbbc649c6877646f6b9719203"
              alt="User icon"
              className={styles.userIcon}
            />
            <div className={styles.welcomeText}>¡Bienvenido, José Ortiz!</div>
          </div>
          <div className={styles.userSection}>
            <div className={styles.userProfile}>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/profile-avatar.png?placeholderIfAbsent=true&apiKey=4347c25cbbc649c6877646f6b9719203"
                alt="Profile avatar"
                className={styles.profileAvatar}
              />
              <div className={styles.userInfo}>
                <div className={styles.userName}>José Ortiz</div>
                <div className={styles.userRole}>Administrador</div>
              </div>
            </div>
            <div className={styles.headerActions}>
              <div className={styles.divider} />
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/logout-icon.png?placeholderIfAbsent=true&apiKey=4347c25cbbc649c6877646f6b9719203"
                alt="Logout"
                className={styles.logoutIcon}
              />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.headerSpacer} />

      {/* Navigation and School Selector */}
      <div className={styles.topNavigation}>
        <div className={styles.navigationTabs}>
          <div className={styles.navTab}>Listado</div>
          <div className={styles.navTab}>Calendario</div>
        </div>
        <div className={styles.schoolSelector}>
          <div className={styles.schoolFlag}>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/british-flag.png?placeholderIfAbsent=true&apiKey=4347c25cbbc649c6877646f6b9719203"
              alt="British Flag"
              className={styles.flagImage}
            />
          </div>
          <div className={styles.schoolName}>British Royal</div>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/dropdown-arrow.png?placeholderIfAbsent=true&apiKey=4347c25cbbc649c6877646f6b9719203"
            alt="Dropdown arrow"
            className={styles.dropdownArrow}
          />
        </div>
      </div>

      {/* Divider Line */}
      <div className={styles.dividerSection}>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/divider-line.png?placeholderIfAbsent=true&apiKey=4347c25cbbc649c6877646f6b9719203"
          alt="Divider"
          className={styles.dividerImage}
        />
        <div className={styles.dividerLine} />
      </div>

      {/* Search Filters and Create Button */}
      <div className={styles.filtersSection}>
        <div className={styles.searchFilters}>
          <div className={styles.searchBox}>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/search-icon.png?placeholderIfAbsent=true&apiKey=4347c25cbbc649c6877646f6b9719203"
              alt="Search"
              className={styles.searchIcon}
            />
            <div className={styles.searchText}>Buscar</div>
          </div>
          <div className={styles.filterButton}>Esta semana</div>
          <div className={styles.dateRangeFilter}>
            <div className={styles.dateRangeContent}>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/calendar-left.png?placeholderIfAbsent=true&apiKey=4347c25cbbc649c6877646f6b9719203"
                alt="Previous"
                className={styles.dateArrowLeft}
              />
              <div className={styles.dateRangeDivider} />
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/calendar-icon.png?placeholderIfAbsent=true&apiKey=4347c25cbbc649c6877646f6b9719203"
                alt="Calendar"
                className={styles.calendarIcon}
              />
              <div className={styles.dateText}>1 Abri 2025 - 1 May 2025</div>
              <div className={styles.dateRangeDivider} />
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/calendar-right.png?placeholderIfAbsent=true&apiKey=4347c25cbbc649c6877646f6b9719203"
                alt="Next"
                className={styles.dateArrowRight}
              />
            </div>
          </div>
        </div>
        <Link href="/admin/create-event" className={styles.createEventButton}>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/plus-icon.png?placeholderIfAbsent=true&apiKey=4347c25cbbc649c6877646f6b9719203"
            alt="Add"
            className={styles.plusIcon}
          />
          <div className={styles.createEventText}>Crear nuevo evento</div>
        </Link>
      </div>

      {/* Active Events Section */}
      <div className={styles.activeEventsSection}>
        <div className={styles.sectionHeader}>Eventos activos</div>
        <div className={styles.eventsContainer}>
          <div className={styles.eventsListHeader}>
            <div className={styles.eventsSelectorText}>
              Seleccionar evento a visualizar
            </div>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/dropdown-small.png?placeholderIfAbsent=true&apiKey=4347c25cbbc649c6877646f6b9719203"
              alt="Dropdown"
              className={styles.dropdownSmall}
            />
          </div>

          {/* First Active Event Card */}
          <div className={styles.eventCard}>
            <div className={styles.eventCardHeader}>
              <div className={styles.eventCardLeft}>
                <div className={styles.eventDetails}>
                  <div className={styles.statusIndicator} />
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/school-logo-1.png?placeholderIfAbsent=true&apiKey=4347c25cbbc649c6877646f6b9719203"
                    alt="School logo"
                    className={styles.schoolLogo}
                  />
                </div>
                <div className={styles.placeLabel}>Lugar</div>
              </div>
              <div className={styles.eventInfo}>
                <div className={styles.schoolNameBold}>
                  British royal school
                </div>
                <div className={styles.schoolEmail}>Gerencia@british.cl</div>
              </div>
              <div className={styles.priceSection}>
                <div className={styles.price}>$0</div>
                <div className={styles.phoneLabel}>Teléfono</div>
              </div>
              <div className={styles.paymentMethod}>Pago al contado</div>
              <div className={styles.attendeesSection}>
                <div className={styles.attendeesButton}>
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/user-group.png?placeholderIfAbsent=true&apiKey=4347c25cbbc649c6877646f6b9719203"
                    alt="Attendees"
                    className={styles.attendeesIcon}
                  />
                  <div className={styles.attendeesText}>
                    <span>Asistentes</span>
                    <span>1200</span>
                  </div>
                </div>
                <div className={styles.rutLabel}>Rut</div>
              </div>
              <div className={styles.dateLabel}>Fecha</div>
              <div className={styles.periodSection}>
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/menu-dots.png?placeholderIfAbsent=true&apiKey=4347c25cbbc649c6877646f6b9719203"
                  alt="Menu"
                  className={styles.menuIcon}
                />
                <div className={styles.periodLabel}>Periodo</div>
              </div>
            </div>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/divider-line.png?placeholderIfAbsent=true&apiKey=4347c25cbbc649c6877646f6b9719203"
              alt="Divider"
              className={styles.eventDivider}
            />
            <div className={styles.eventDetails}>
              <div className={styles.eventDetail}>Parque Padre Hurtado</div>
              <div className={styles.eventDetail}>9 4578 2569</div>
              <div className={styles.eventDetail}>76.029.290-8</div>
              <div className={styles.eventDetail}>20/05/2025</div>
              <div className={styles.eventDetail}>13:00 a 17:00</div>
            </div>
          </div>

          {/* Second Active Event Card */}
          <div className={styles.eventCardSimple}>
            <div className={styles.eventCardSimpleContent}>
              <div className={styles.eventCardSimpleLeft}>
                <div className={styles.statusIndicator} />
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/school-logo-2.png?placeholderIfAbsent=true&apiKey=4347c25cbbc649c6877646f6b9719203"
                  alt="School logo"
                  className={styles.schoolLogo}
                />
              </div>
              <div className={styles.eventCardSimpleInfo}>
                <div className={styles.schoolNameBold}>
                  British royal school
                </div>
                <div className={styles.schoolEmail}>Gerencia@british.cl</div>
              </div>
              <div className={styles.price}>$0</div>
              <div className={styles.paymentMethod}>Pago por transferencia</div>
              <div className={styles.attendeesButton}>
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/user-group.png?placeholderIfAbsent=true&apiKey=4347c25cbbc649c6877646f6b9719203"
                  alt="Attendees"
                  className={styles.attendeesIcon}
                />
                <div className={styles.attendeesText}>
                  <span>Asistentes</span>
                  <span>1500</span>
                </div>
              </div>
            </div>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/menu-dots.png?placeholderIfAbsent=true&apiKey=4347c25cbbc649c6877646f6b9719203"
              alt="Menu"
              className={styles.menuIcon}
            />
          </div>
        </div>
      </div>

      {/* Section Divider */}
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/section-divider.png?placeholderIfAbsent=true&apiKey=4347c25cbbc649c6877646f6b9719203"
        alt="Section divider"
        className={styles.sectionDivider}
      />

      {/* Scheduled Events Section */}
      <div className={styles.scheduledEventsSection}>
        <div className={styles.sectionTitle}>Eventos programados</div>
        <div className={styles.scheduledEventsContainer}>
          <div className={styles.scheduledEventCard}>
            <div className={styles.scheduledEventContent}>
              <div className={styles.scheduledEventLeft}>
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/school-logo-3.png?placeholderIfAbsent=true&apiKey=4347c25cbbc649c6877646f6b9719203"
                  alt="School logo"
                  className={styles.schoolLogo}
                />
                <div className={styles.eventCardSimpleInfo}>
                  <div className={styles.schoolNameBold}>
                    British royal school
                  </div>
                  <div className={styles.schoolEmail}>Gerencia@british.cl</div>
                </div>
              </div>
              <div className={styles.scheduledEventInfo}>
                <div className={styles.price}>$0</div>
                <div className={styles.paymentMethod}>
                  Pago por transferencia
                </div>
                <div className={styles.attendeesButton}>
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/user-group.png?placeholderIfAbsent=true&apiKey=4347c25cbbc649c6877646f6b9719203"
                    alt="Attendees"
                    className={styles.attendeesIcon}
                  />
                  <div className={styles.attendeesText}>
                    <span>Asistentes</span>
                    <span>1500</span>
                  </div>
                </div>
              </div>
            </div>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/menu-dots.png?placeholderIfAbsent=true&apiKey=4347c25cbbc649c6877646f6b9719203"
              alt="Menu"
              className={styles.menuIcon}
            />
          </div>

          <div className={styles.scheduledEventCard}>
            <div className={styles.scheduledEventContent}>
              <div className={styles.scheduledEventLeft}>
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/school-logo-4.png?placeholderIfAbsent=true&apiKey=4347c25cbbc649c6877646f6b9719203"
                  alt="School logo"
                  className={styles.schoolLogo}
                />
                <div className={styles.eventCardSimpleInfo}>
                  <div className={styles.schoolNameBold}>
                    British royal school
                  </div>
                  <div className={styles.schoolEmail}>Gerencia@british.cl</div>
                </div>
              </div>
              <div className={styles.scheduledEventInfo}>
                <div className={styles.price}>$0</div>
                <div className={styles.paymentMethod}>
                  Pago por transferencia
                </div>
                <div className={styles.attendeesButton}>
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/user-group.png?placeholderIfAbsent=true&apiKey=4347c25cbbc649c6877646f6b9719203"
                    alt="Attendees"
                    className={styles.attendeesIcon}
                  />
                  <div className={styles.attendeesText}>
                    <span>Asistentes</span>
                    <span>1500</span>
                  </div>
                </div>
              </div>
            </div>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/menu-dots.png?placeholderIfAbsent=true&apiKey=4347c25cbbc649c6877646f6b9719203"
              alt="Menu"
              className={styles.menuIcon}
            />
          </div>
        </div>
      </div>

      {/* Section Divider */}
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/section-divider.png?placeholderIfAbsent=true&apiKey=4347c25cbbc649c6877646f6b9719203"
        alt="Section divider"
        className={styles.sectionDivider}
      />

      {/* Past Events Section */}
      <div className={styles.pastEventsSection}>
        <div className={styles.sectionTitle}>Lista de eventos pasados</div>
        <div className={styles.pastEventsContainer}>
          <div className={styles.pastEventsHeader}>
            <div className={styles.pastEventsHeaderRow}>
              <div className={styles.headerItem}>Fecha</div>
              <div className={styles.headerItem}>Entradas vendidas</div>
              <div className={styles.headerItem}>Ingresos totales</div>
              <div className={styles.headerItem}>Ver más</div>
            </div>
          </div>

          {/* Past Event 1 */}
          <div className={styles.pastEventRow}>
            <div className={styles.pastEventLeft}>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/event-autumn.png?placeholderIfAbsent=true&apiKey=4347c25cbbc649c6877646f6b9719203"
                alt="Event image"
                className={styles.schoolLogo}
              />
              <div className={styles.pastEventInfo}>
                <div className={styles.schoolNameBold}>Fiesta de otoño</div>
                <div className={styles.schoolEmail}>British Royal School</div>
              </div>
            </div>
            <div className={styles.pastEventData}>
              <div className={styles.pastEventDate}>22/01/2024</div>
              <div className={styles.pastEventTickets}>220</div>
            </div>
            <div className={styles.pastEventRevenue}>
              <div className={styles.pastEventAmount}>$1.000.000 CLP</div>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/view-more.png?placeholderIfAbsent=true&apiKey=4347c25cbbc649c6877646f6b9719203"
                alt="View more"
                className={styles.viewMoreIcon}
              />
            </div>
          </div>

          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/row-divider.png?placeholderIfAbsent=true&apiKey=4347c25cbbc649c6877646f6b9719203"
            alt="Row divider"
            className={styles.rowDivider}
          />

          {/* Past Event 2 */}
          <div className={styles.pastEventRow}>
            <div className={styles.pastEventLeft}>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/event-halloween.png?placeholderIfAbsent=true&apiKey=4347c25cbbc649c6877646f6b9719203"
                alt="Event image"
                className={styles.schoolLogo}
              />
              <div className={styles.pastEventInfo}>
                <div className={styles.schoolNameBold}>Fiesta de Haloween</div>
                <div className={styles.schoolEmail}>Brisith Royal School</div>
              </div>
            </div>
            <div className={styles.pastEventData}>
              <div className={styles.pastEventDate}>30/10/2023</div>
              <div className={styles.pastEventTickets}>600</div>
            </div>
            <div className={styles.pastEventRevenue}>
              <div className={styles.pastEventAmount}>$1.300.000 CLP</div>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/view-more.png?placeholderIfAbsent=true&apiKey=4347c25cbbc649c6877646f6b9719203"
                alt="View more"
                className={styles.viewMoreIcon}
              />
            </div>
          </div>

          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/row-divider.png?placeholderIfAbsent=true&apiKey=4347c25cbbc649c6877646f6b9719203"
            alt="Row divider"
            className={styles.rowDivider}
          />

          {/* Past Event 3 */}
          <div className={styles.pastEventRow}>
            <div className={styles.pastEventLeft}>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/event-halloween.png?placeholderIfAbsent=true&apiKey=4347c25cbbc649c6877646f6b9719203"
                alt="Event image"
                className={styles.schoolLogo}
              />
              <div className={styles.pastEventInfo}>
                <div className={styles.schoolNameBold}>Fiesta de Haloween</div>
                <div className={styles.schoolEmail}>Brisith Royal School</div>
              </div>
            </div>
            <div className={styles.pastEventData}>
              <div className={styles.pastEventDate}>30/10/2023</div>
              <div className={styles.pastEventTickets}>600</div>
            </div>
            <div className={styles.pastEventRevenue}>
              <div className={styles.pastEventAmount}>$1.300.000 CLP</div>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/view-more.png?placeholderIfAbsent=true&apiKey=4347c25cbbc649c6877646f6b9719203"
                alt="View more"
                className={styles.viewMoreIcon}
              />
            </div>
          </div>

          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/row-divider.png?placeholderIfAbsent=true&apiKey=4347c25cbbc649c6877646f6b9719203"
            alt="Row divider"
            className={styles.rowDivider}
          />

          {/* Past Event 4 */}
          <div className={styles.pastEventRow}>
            <div className={styles.pastEventLeft}>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/event-halloween.png?placeholderIfAbsent=true&apiKey=4347c25cbbc649c6877646f6b9719203"
                alt="Event image"
                className={styles.schoolLogo}
              />
              <div className={styles.pastEventInfo}>
                <div className={styles.schoolNameBold}>Fiesta de Haloween</div>
                <div className={styles.schoolEmail}>Brisith Royal School</div>
              </div>
            </div>
            <div className={styles.pastEventData}>
              <div className={styles.pastEventDate}>30/10/2023</div>
              <div className={styles.pastEventTickets}>600</div>
            </div>
            <div className={styles.pastEventRevenue}>
              <div className={styles.pastEventAmount}>$1.300.000 CLP</div>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/view-more.png?placeholderIfAbsent=true&apiKey=4347c25cbbc649c6877646f6b9719203"
                alt="View more"
                className={styles.viewMoreIcon}
              />
            </div>
          </div>
        </div>

        {/* Pagination */}
        <div className={styles.pagination}>
          <div className={styles.rowsPerPage}>
            <div className={styles.rowsPerPageText}>Filas por páginas</div>
            <div className={styles.rowsSelector}>
              <div className={styles.rowsNumber}>4</div>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/dropdown-small.png?placeholderIfAbsent=true&apiKey=4347c25cbbc649c6877646f6b9719203"
                alt="Dropdown"
                className={styles.dropdownSmall}
              />
            </div>
          </div>
          <div className={styles.pageInfo}>
            <div className={styles.pageText}>1 - 4 de 20</div>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/arrow-left.png?placeholderIfAbsent=true&apiKey=4347c25cbbc649c6877646f6b9719203"
              alt="Previous page"
              className={styles.paginationArrow}
            />
          </div>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/arrow-right.png?placeholderIfAbsent=true&apiKey=4347c25cbbc649c6877646f6b9719203"
            alt="Next page"
            className={styles.paginationArrow}
          />
        </div>
      </div>
    </div>
  );
}
