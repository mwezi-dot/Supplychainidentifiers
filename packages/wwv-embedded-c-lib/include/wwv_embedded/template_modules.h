#ifndef WWV_EMBEDDED_TEMPLATE_MODULES_H
#define WWV_EMBEDDED_TEMPLATE_MODULES_H

#include <stddef.h>
#include <stdint.h>

/** Generic status code for template interfaces. */
typedef enum wwv_status_code {
  WWV_OK = 0,
  WWV_INVALID_ARGUMENT = 1,
  WWV_NOT_READY = 2,
  WWV_INTERNAL_ERROR = 3
} wwv_status_code;

/** Generic key/value context for embedded modules. */
typedef struct wwv_context_entry {
  const char* key;
  const char* value;
} wwv_context_entry;

/** Bundle of context entries passed to modules. */
typedef struct wwv_context {
  const wwv_context_entry* entries;
  size_t count;
} wwv_context;

/** Sensor fusion C interfaces. */
typedef struct wwv_sensor_fusion_module {
  wwv_status_code (*multi_sensor_fusion_engine)(const float* samples, size_t sample_count, float* out);
  wwv_status_code (*kalman_filter_fusion)(const float* measurements, size_t count, float* state);
  wwv_status_code (*bayesian_sensor_fusion)(const float* priors, const float* likelihoods, size_t count, float* posterior);
  wwv_status_code (*sensor_confidence_scorer)(const float* readings, size_t count, float* confidence);
  wwv_status_code (*cross_sensor_validator)(const float* channels, size_t count, uint8_t* valid);
  wwv_status_code (*temporal_fusion_processor)(const float* series, size_t count, float* fused);
  wwv_status_code (*spatial_fusion_analyzer)(const float* grid, size_t width, size_t height, float* score);
  wwv_status_code (*noise_reduction_engine)(const float* noisy, size_t count, float* clean);
  wwv_status_code (*signal_reconstruction_module)(const float* partial, size_t count, float* reconstructed);
  wwv_status_code (*sensor_drift_compensator)(const float* baseline, const float* current, size_t count, float* compensated);
} wwv_sensor_fusion_module;

/** Edge computing C interfaces. */
typedef struct wwv_edge_module {
  wwv_status_code (*edge_node_manager)(const wwv_context* ctx);
  wwv_status_code (*local_inference_engine)(const float* features, size_t feature_count, float* result);
  wwv_status_code (*edge_data_cache)(const char* key, const uint8_t* bytes, size_t length);
  wwv_status_code (*bandwidth_optimizer)(const uint8_t* payload, size_t length, uint8_t* output, size_t* output_length);
  wwv_status_code (*offline_processing_module)(const wwv_context* ctx);
  wwv_status_code (*edge_sync_manager)(const wwv_context* ctx);
  wwv_status_code (*distributed_edge_coordinator)(const wwv_context* ctx);
  wwv_status_code (*latency_reduction_engine)(const wwv_context* ctx);
  wwv_status_code (*edge_security_layer)(const wwv_context* ctx);
  wwv_status_code (*local_decision_engine)(const float* signals, size_t count, int32_t* decision_code);
} wwv_edge_module;

#endif
