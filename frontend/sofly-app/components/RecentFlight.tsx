"use client";

import { Plane, Camera, Forward, Plus, ClockCheck } from "lucide-react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";

interface RecentFlightProps {
  departure: string;
  arrival: string;
  date: string;
  status?: "Live";
  photos?: number;
  photoUrls?: string[];
  tracking?: string;
  isLanding?: boolean;
}

export default function RecentFlight({ departure, arrival, date, status, photos, photoUrls, tracking, isLanding = false }: RecentFlightProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <Card className="relative cursor-pointer shadow-md hover:shadow-lg transition-all border-0">
      <CardContent className="p-4">
        <div className="absolute top-2 right-2 flex flex-col items-end gap-2">
          <Button
            variant="ghost"
            size="icon"
            disabled={!isLanding}
            className="h-auto w-auto p-1"
            aria-label={isLanding ? "View flight details" : "Flight details coming soon"}
            title={isLanding ? "View flight details" : "Flight details coming soon"}
            aria-disabled={!isLanding}
            onClick={() => {
              if (isLanding) {
                // TODO: Navigate to flight details page when implemented
                // router.push(`/flights/${flightId}`);
              }
            }}
          >
            <Forward className="text-black size-5" strokeWidth={isLanding ? 1.5 : 2} />
          </Button>
        
        {/* Photos preview */}
        {photoUrls && photoUrls.length > 0 ? (
          <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 grid grid-cols-2 gap-0.5 p-0.5 hover:opacity-90 transition-opacity">
            {Array.from({ length: 4 }).map((_, idx) => {
              const photoUrl = photoUrls[idx];
              return (
                <div key={idx} className="relative w-full h-full bg-gray-200">
                  {photoUrl ? (
                    <Image
                      src={photoUrl}
                      alt={`Photo ${idx + 1}`}
                      fill
                      className="object-cover"
                      sizes="24px"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                      <Plus className="w-3 h-3 text-gray-400" strokeWidth={2.5} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : photos && photos > 0 ? (
          <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 grid grid-cols-2 gap-0.5 p-0.5">
            {Array.from({ length: Math.min(photos, 4) }).map((_, idx) => (
              <div 
                key={idx} 
                className="bg-gradient-to-br from-blue-200 to-blue-300 flex items-center justify-center"
              >
                <Camera className="w-3 h-3 text-white/80" strokeWidth={2} />
              </div>
            ))}
          </div>
        ) : null}
        </div>
        <div className="flex items-start justify-between pr-20">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <p className="font-bold text-gray-900 text-base">{`${departure}  →  ${arrival}`}</p>
            {status === "Live" && (
              <Badge variant="secondary" className="bg-green-50 text-green-700 border-0">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse mr-1" />
                Live
              </Badge>
            )}
          </div>
          <p className="text-sm text-gray-500">{date}</p>
          {photos && (
            <div className="flex items-center gap-1.5 mt-2">
              <Camera className="w-3.5 h-3.5 text-gray-400" />
              <span className="text-xs text-gray-500">{photos} photos</span>
            </div>
          )}
          {tracking && (
            <div className="flex items-center gap-1.5 mt-2">
              {tracking === 'Live' ? (
                <>
                  <ClockCheck className="w-3.5 h-3.5 text-green-600" strokeWidth={2.5} />
                  <span className="text-xs text-green-600 font-medium">On time</span>
                </>
              ) : (
                <span className="text-xs text-green-600 font-medium">On time</span>
              )}
            </div>
          )}
        </div>
        </div>
      </CardContent>
    </Card>
    </motion.div>
  );
}

