import React, { useState, useEffect } from 'react';
import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import { Location } from '../types';
import { subscribeToCollection } from '../services/dataService';
import { motion } from 'motion/react';

const API_KEY = process.env.GOOGLE_MAPS_PLATFORM_KEY || '';
const hasValidKey = Boolean(API_KEY) && API_KEY !== 'YOUR_API_KEY';

export default function ServiceAreaMap() {
  const [locations, setLocations] = useState<Location[]>([]);

  useEffect(() => {
    const unsubscribe = subscribeToCollection<Location>('locations', setLocations);
    return () => unsubscribe();
  }, []);

  const defaultLocations = [
    { id: '1', name: 'Jakarta', lat: -6.2088, lng: 106.8456 },
  ];

  const displayLocations = locations.length > 0 ? locations : defaultLocations;

  if (!hasValidKey) {
    return (
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-6">
              Serving Communities Throughout the Greater Area
            </h2>
          </div>
          <div className="bg-white border-2 border-dashed border-slate-200 rounded-3xl p-12 text-center">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Google Maps API Key Required</h3>
            <p className="text-slate-600 mb-8 max-w-md mx-auto">
              To view our service area map, please add your Google Maps Platform API key as a secret named <code>GOOGLE_MAPS_PLATFORM_KEY</code> in AI Studio.
            </p>
            <div className="inline-flex items-center gap-4 p-4 bg-slate-50 rounded-2xl text-sm text-slate-500 text-left">
              <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center text-teal-600 font-bold">!</div>
              <div>The map will appear here once the key is configured.</div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-teal-600 font-bold uppercase tracking-widest text-xs mb-4">
            <div className="w-8 h-[2px] bg-teal-600" />
            Service Area
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-6">
            Serving Communities Throughout the Greater Area
          </h2>
          <p className="text-lg text-slate-600">
            We provide professional HVAC services to residential and commercial clients across the region. Check if we're in your neighborhood!
          </p>
        </div>

        <div className="h-[500px] rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
          <APIProvider apiKey={API_KEY} version="weekly">
            <Map
              defaultCenter={displayLocations[0] || { lat: -6.2088, lng: 106.8456 }}
              defaultZoom={12}
              mapId="DEMO_MAP_ID"
              {...({ internalUsageAttributionIds: ['gmp_mcp_codeassist_v1_aistudio'] } as any)}
              style={{ width: '100%', height: '100%' }}
            >
              {displayLocations.map(loc => (
                <AdvancedMarker key={loc.id} position={{ lat: loc.lat, lng: loc.lng }} title={loc.name}>
                  <Pin background="#0d9488" glyphColor="#fff" borderColor="#0f766e" />
                </AdvancedMarker>
              ))}
            </Map>
          </APIProvider>
        </div>
      </div>
    </section>
  );
}
