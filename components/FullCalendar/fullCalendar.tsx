'use client';

import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';
import { Dialog } from '@headlessui/react';
import { EventClickArg } from '@fullcalendar/core';

const StyleWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 1rem;

  .fc {
    width: 100%;
    max-width: 1000px;
    background: #ffffff;
    border-radius: 1rem;
    padding: 1rem;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    font-family: 'Inter', sans-serif;
    color: #333;
    overflow-x: auto;
  }

  .fc-toolbar {
    flex-wrap: wrap;
    gap: 0.5rem;

    .fc-toolbar-title {
      font-size: 1.25rem;
      font-weight: 600;
    }

    .fc-button {
      background: #3b82f6;
      border: none;
      color: white;
      padding: 0.4rem 0.75rem;
      border-radius: 0.5rem;
      margin: 0 0.25rem;
      transition: background 0.3s;

      &:hover {
        background: #2563eb;
      }

      &:disabled {
        background: #9ca3af;
      }
    }
  }

  .fc-daygrid-day {
    border: 1px solid #e5e7eb;
  }

  .fc-daygrid-event {
    background: #10b981;
    color: white;
    padding: 2px 6px;
    border-radius: 0.25rem;
    font-size: 0.75rem;
    margin-bottom: 2px;

    &:hover {
      background: #059669;
    }
  }

  .fc-scrollgrid {
    border-radius: 0.75rem;
    overflow: hidden;
  }

  /* Mobile adjustments */
  @media (max-width: 640px) {
    .fc-toolbar-title {
      font-size: 1rem;
    }

    .fc-button {
      font-size: 0.75rem;
      padding: 0.3rem 0.5rem;
    }

    .fc-daygrid-event {
      font-size: 0.65rem;
    }

    .fc {
      padding: 0.5rem;
    }
  }
`;


export default function CustomCalendar() {
  const [initialView, setInitialView] = useState<null | 'dayGridMonth' | 'listWeek'>(null);
  const [selectedEvent, setSelectedEvent] = useState<null | {
    title: string;
    start: string;
    end: string;
  }>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isMobile = window.innerWidth <= 768;
      setInitialView(isMobile ? "listWeek" : "dayGridMonth");
    }
  }, []);

  if (!initialView) return null;



  const handleEventClick = (info: EventClickArg) => {
    const start = info.event.start?.toLocaleString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });

    const end = info.event.end?.toLocaleString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });

    setSelectedEvent({
      title: info.event.title,
      start: start || '',
      end: end || '',
    });
  };

  const closeModal = () => setSelectedEvent(null);

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className='w-full'
        >
          <StyleWrapper className="w-full">
            <FullCalendar
              plugins={[dayGridPlugin, listPlugin, interactionPlugin]}
              initialView={initialView}
              locale={"en"}
              eventContent={renderEventContent}
              dateClick={(arg) => console.log(arg)}
              eventClick={handleEventClick}
              events={[
                {
                  title: 'Sự kiện 1',
                  start: '2025-04-20T07:30:00',
                  end: '2025-04-20T09:00:00'
                },
                {
                  title: 'Sự kiện 23222222222222222222',
                  start: '2025-04-21T18:00:00',
                  end: '2025-04-21T20:00:00'
                }
              ]}
            />
          </StyleWrapper>
        </motion.div>
      </AnimatePresence>


      {/* Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <Dialog
            open={!!selectedEvent}
            onClose={closeModal}
            className="relative z-50"
          >
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />
            {/* Modal content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 flex items-center justify-center p-4"
            >
              <Dialog.Panel className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
                <Dialog.Title className="text-lg font-bold mb-2">Thông tin lịch trình</Dialog.Title>
                <div className="space-y-2 text-sm text-gray-700">
                  <p>
                    <span className="font-medium">Tiêu đề:</span> {selectedEvent.title}
                  </p>
                  <p>
                    <span className="font-medium">Bắt đầu:</span> {selectedEvent.start}
                  </p>
                  <p>
                    <span className="font-medium">Kết thúc:</span> {selectedEvent.end}
                  </p>
                </div>

                <div className="mt-4 justify-end flex gap-3">
                  <button
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                    onClick={closeModal}
                  >
                    Xóa
                  </button>
                  <button
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    onClick={closeModal}
                  >
                    Đóng
                  </button>
                </div>
              </Dialog.Panel>
            </motion.div>
          </Dialog>
        )}
      </AnimatePresence>
    </>
  );
};

function renderEventContent(eventInfo) {
  const start = eventInfo.event.start;
  const title = eventInfo.event.title;

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const startTime = start ? formatTime(start) : '';

  return (
    <div className='flex gap-[2px]'>
      <b>{startTime}</b>
      <span>{title}</span>
    </div>
  );
}
