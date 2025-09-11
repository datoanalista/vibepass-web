import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useEventsContext } from '@/contexts/EventsContext';
import { EventContextType } from '@/types/events';
import styles from './SearchBar.module.css';

const SearchBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { events, loading } = useEventsContext();
  const router = useRouter();

  // Filtrar eventos por término de búsqueda
  const filteredEvents = React.useMemo(() => {
    if (!searchTerm.trim()) return events.slice(0, 10); // Mostrar máximo 10 eventos
    
    const filtered = events.filter(event => 
      event.informacionGeneral?.nombreEvento?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.informacionGeneral?.descripcion?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.informacionGeneral?.lugarEvento?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    return filtered.slice(0, 10); // Máximo 10 resultados
  }, [events, searchTerm]);

  const handleEventSelect = (eventId: string) => {
    router.push(`/evento-seleccionado?eventoId=${eventId}`);
    setIsOpen(false);
    setSearchTerm('');
  };

  const handleInputFocus = () => {
    setIsOpen(true);
  };

  const handleInputBlur = () => {
    // Delay para permitir clicks en el dropdown
    setTimeout(() => setIsOpen(false), 200);
  };

  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchWrapper}>
        <div className={styles.searchIcon}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 19L13 13M15 8C15 11.866 11.866 15 8 15C4.13401 15 1 11.866 1 8 C1 4.13401 4.13401 1 8 1C11.866 1 15 4.13401 15 8Z"
              stroke="#666666"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Buscar eventos..."
          className={styles.searchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
        />
        
        {/* Dropdown de eventos */}
        {isOpen && !loading && (
          <div className={styles.dropdown}>
            {filteredEvents.length > 0 ? (
              <>
                {filteredEvents.map((event: EventContextType) => (
                  <div
                    key={event.id || event._id}
                    className={styles.dropdownItem}
                    onClick={() => handleEventSelect(event.id || event._id)}
                  >
                    <div className={styles.eventInfo}>
                      <h4 className={styles.eventName}>{event.informacionGeneral?.nombreEvento}</h4>
                      <p className={styles.eventDetails}>
                        {new Date(event.informacionGeneral?.fechaEvento).toLocaleDateString('es-CL')} - {event.informacionGeneral?.lugarEvento}
                      </p>
                    </div>
                  </div>
                ))}
                {events.length > 10 && (
                  <div className={styles.dropdownFooter}>
                    {searchTerm ? 
                      `Mostrando ${filteredEvents.length} de ${events.filter(e => 
                        e.informacionGeneral?.nombreEvento?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        e.informacionGeneral?.descripcion?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        e.informacionGeneral?.lugarEvento?.toLowerCase().includes(searchTerm.toLowerCase())
                      ).length} resultados` :
                      `Mostrando 10 de ${events.length} eventos`
                    }
                  </div>
                )}
              </>
            ) : (
              <div className={styles.noResults}>
                <p>No se encontraron eventos que coincidan con "{searchTerm}"</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
