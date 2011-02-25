/*
 * Copyright 2010 Research In Motion Limited.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package net.rim.tumbler.extension;

// equals() and hashCode() are based on pathname
class ConfiguredPathname {
    private String _pathname;
    private String _relativeToPackage;

    public ConfiguredPathname(String pathname) {
        this(pathname, null);
    }

    public ConfiguredPathname(String pathname, String relativeToPackage) {
        _pathname = pathname;
        _relativeToPackage = relativeToPackage;
    }

    public String getPathname() {
        return _pathname;
    }

    public String getRelativeToPackage() {
        return _relativeToPackage;
    }

    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }

        if (!(o instanceof ConfiguredPathname)) {
            return false;
        }
        ConfiguredPathname other = (ConfiguredPathname)o;

        return _pathname == null
            ? other._pathname == null
            : _pathname.equals(other._pathname);
    }

    public int hashCode() {
        return _pathname.hashCode();
    }
}
