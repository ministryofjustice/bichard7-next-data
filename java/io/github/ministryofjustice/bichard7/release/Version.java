package io.github.ministryofjustice.bichard7.release;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Version {

    private final String version;

    public Version(@JsonProperty("version") final String version) {
        this.version = version;
    }

    public String getValue() {
        return version;
    }
}
